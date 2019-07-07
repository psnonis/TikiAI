#!/usr/bin/python3

import numpy as np
import click as ck
import torch
import time
import yaml
import cv2
import gc

from PIL import Image

from maskrcnn_benchmark.config                    import cfg
from maskrcnn_benchmark.layers                    import nms
from maskrcnn_benchmark.modeling.detector         import build_detection_model
from maskrcnn_benchmark.structures.image_list     import to_image_list
from maskrcnn_benchmark.utils.model_serialization import load_state_dict

from torchvision import models, transforms

from pythia.utils.configuration import ConfigNode
from pythia.tasks.processors    import VocabProcessor, VQAAnswerProcessor
from pythia.models.pythia       import Pythia
from pythia.common.registry     import registry
from pythia.common.sample       import Sample, SampleList

class Oracle:

    TARGET_IMAGE_SIZE = [448, 448]
    CHANNEL_MEAN      = [0.485, 0.456, 0.406]
    CHANNEL_STD       = [0.229, 0.224, 0.225]

    def __init__(self, device_type):

        print(f'Oracle : Initializing : Device Type is {device_type}')

        start = time.time()

        self.device = torch.device(device_type)

        self.build_processors()

        self.resnet152_model = self.build_resnet_model() # https://github.com/pytorch/vision
        self.detectron_model = self.build_detect_model() # https://github.com/facebookresearch/Detectron
        self.pythiaVQA_model = self.build_pythia_model() # https://github.com/facebookresearch/Pythia

        end = time.time()
        print( f'Oracle : Initializing : Finished in {end-start:7.3f} Seconds')

    def build_processors(self):

        print('Oracle : Initializing : Building - Text Processors')

        with open('/final/data/pythia.yaml') as f:
            config = yaml.load(f, Loader = yaml.FullLoader)

        config = ConfigNode(config)
        config.training_parameters.evalai_inference = True # Remove warning
        registry.register('config', config)

        self.config             = config
        vqa_config              = config.task_attributes.vqa.dataset_attributes.vqa2
        text_processor_config   = vqa_config.processors.text_processor
        answer_processor_config = vqa_config.processors.answer_processor
        
        text_processor_config.params.vocab.vocab_file = '/final/data/vocabulary_100k.txt'
        answer_processor_config.params.vocab_file     = '/final/data/answers_vqa.txt'

        self.text_processor   = VocabProcessor(text_processor_config.params)
        self.answer_processor = VQAAnswerProcessor(answer_processor_config.params)

        registry.register('vqa2_text_processor', self.text_processor)
        registry.register('vqa2_answer_processor', self.answer_processor)
        registry.register('vqa2_num_final_outputs', self.answer_processor.get_vocab_size())

    def build_pythia_model(self):

        def multi_gpu_state_to_single(state_dict):

            new_sd = {}
            for k, v in state_dict.items():
                if  not k.startswith('module.'):
                    raise TypeError('Not a multiple GPU state of dict')
                k1 = k[7:]
                new_sd[k1] = v

            return new_sd

        print('Oracle : Initializing : Building - PythiaVQA')

        state_dict = torch.load('/final/data/pythia.pth', map_location = self.device)

      # for param_tensor in state_dict:
      #     print(param_tensor, '\t', state_dict[param_tensor].size())

        model_config = self.config.model_attributes.pythia
        model_config.model_data_dir = '/final/data/'

        model = Pythia(model_config)
        model.build()
        model.init_losses_and_metrics()

        if  list(state_dict.keys())[0].startswith('module') and not hasattr(model, 'module'):
            state_dict = multi_gpu_state_to_single(state_dict)

        model.load_state_dict(state_dict)

        model.to(self.device.type)
        model.eval()

        return model
    
    def build_resnet_model(self):

        print('Oracle : Initializing : Building - ResNet152')

        self.data_transforms = transforms.Compose([
            transforms.Resize(self.TARGET_IMAGE_SIZE),
            transforms.ToTensor(),
            transforms.Normalize(self.CHANNEL_MEAN, self.CHANNEL_STD),
        ])

        resnet152 = models.resnet152(pretrained = True)
        modules   = list(resnet152.children())[:-2]
        model     = torch.nn.Sequential(*modules)

        model.to(self.device.type)
        model.eval()

        return model

    def build_detect_model(self):

        print('Oracle : Initializing : Building - Detectron')

        cfg.merge_from_file('/final/data/detectron_model.yaml')
        cfg.freeze()

        model = build_detection_model(cfg)
        chkpt = torch.load('/final/data/detectron_model.pth', map_location = self.device)

        load_state_dict(model, chkpt.pop('model'))

        model.to(self.device.type)
        model.eval()

        return model

  # PREDICTION ------------------------------------------------------------------------------------

    def feature_extract(self, output, image_scales, feature_name = 'fc6', conf_thresh = 0.2):

        batch_size        = len(output[0]['proposals'])
        n_boxes_per_image = [len(_) for _ in output[0]['proposals']]
        score_list        = output[0]['scores'].split(n_boxes_per_image)
        score_list        = [torch.nn.functional.softmax(x, -1) for x in score_list]
        features          = output[0][feature_name].split(n_boxes_per_image)
        cur_device        = score_list[0].device

        feature_list      = []

        for i in range(batch_size):

            dets     = output[0]['proposals'][i].bbox / image_scales[i]
            scores   = score_list[i]
            max_conf = torch.zeros((scores.shape[0])).to(cur_device)

            for cls_ind in range(1, scores.shape[1]):
                cls_scores = scores[:, cls_ind]
                keep = nms(dets, cls_scores, 0.5)
                max_conf[keep] = torch.where(cls_scores[keep] > max_conf[keep],
                                             cls_scores[keep],
                                             max_conf[keep])

            keep_boxes = torch.argsort(max_conf, descending = True)[:100]
            feature_list.append(features[i][keep_boxes])

        return feature_list

    def image_transform(self, image_path):

        image  = Image.open(image_path)
        array  = np.array(image).astype(np.float32)
        array  = array[:, :, ::-1]
        array -= np.array([102.9801, 115.9465, 122.7717])

        shape    = array.shape
        size_min = np.min(shape[0:2])
        size_max = np.max(shape[0:2])
        scale    = float(800) / float(size_min)

      # prevent the biggest axis from being more than max_size
        if  np.round(scale * size_max) > 1333:
            scale = float(1333) / float(size_max)

        array = cv2.resize(
                    array,
                    None,
                    None,
                    fx = scale,
                    fy = scale,
                    interpolation = cv2.INTER_LINEAR)

        trans = torch.from_numpy(array).permute(2, 0, 1)

        return trans, scale

    def get_detectron_features(self, image_path):

        start        = time.time()
        image, scale = self.image_transform(image_path)
        images       = to_image_list([image], size_divisible = 32)
        images       = images.to(self.device.type)

        with torch.no_grad():
            output = self.detectron_model(images)

        features  = self.feature_extract(output, [scale], 'fc6', 0.2)
        end       = time.time()

        print(f'Oracle : Getting Features : Detectron - Finished in {end-start:7.3f} Seconds')

        return features[0]

    def get_resnet152_features(self, image_path):

        def transform_image(image_path):

            image = Image.open(image_path).convert('RGB')
            image = self.data_transforms(image)
            
            if  image.shape[0] == 1:
                image = trans.expand(3, -1, -1)

            image = image.unsqueeze(0)
            image = image.to(self.device.type)

            return image

        start    = time.time()
        image    = transform_image(image_path)
        features = self.resnet152_model(image).permute(0, 2, 3, 1)
        features = features.view(196, 2048)
        end      = time.time()

        print(f'Oracle : Getting Features : ResNet152 - Finished in {end-start:7.3f} Seconds')

        return features

    def divine(self, image, question):

        print(f'Oracle : Divining Answers : {image}, {question}')

        with torch.no_grad():

            detectron_features = self.get_detectron_features(image)
            resnet152_features = self.get_resnet152_features(image)

            start  = time.time()
            sample = Sample()

            processed_text  = self.text_processor({'text': question})
            sample.text     = processed_text['text']
            sample.text_len = len(processed_text['tokens'])

            sample.image_feature_0 = detectron_features
            sample.image_info_0    = Sample({
                'max_features': torch.tensor(100, dtype = torch.long)
            })

            sample.image_feature_1 = resnet152_features

            sample_list = SampleList([sample])

            sample_list = sample_list.to(self.device.type)

            scores = self.pythiaVQA_model(sample_list)['scores']
            scores = torch.nn.functional.softmax(scores, dim = 1)
            actual, indices = scores.topk(5, dim = 1)

            top_indices = indices[0]
            top_scores  = actual[0]

            probs   = []
            answers = []

            for idx, score in enumerate(top_scores):
                probs.append(score.item())
                answers.append(
                    self.answer_processor.idx2word(top_indices[idx].item())
                )
            
            end = time.time()

        print(f'Oracle : Divining Answers : PythiaVQA - Finished in {end-start:7.3f} Seconds')
        
        gc.collect()

        torch.cuda.empty_cache()

        return probs, answers

@ck.command()
@ck.option('--image',    default = None)
@ck.option('--question', default = None)
@ck.option('--mode',     default = 'cpu', type = ck.Choice(['cpu', 'cuda', 'mkldnn', 'opengl', 'opencl', 'ideep', 'hip', 'msnpu']))
def divine(image, question, mode):

    oracle = Oracle(mode)

    if  image and question :

        start          = time.time()
        probs, answers = oracle.divine(image, question)
        end            = time.time()

        print(f'Oracle : Divining Answers : End-2-End - Finished in {end-start:7.3f} Seconds')
        print(f'Oracle : RANK | CONFIDENCE | ANSWER')

        for n, (p, a) in enumerate(zip(probs, answers), 1):

            print(f'       : {n:<4} | {p:07.3%}    | {a}')

if  __name__ == '__main__':
    divine()
