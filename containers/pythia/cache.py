#!/usr/bin/env python3

import yaml

from pythia.utils.configuration import ConfigNode
from pythia.tasks.processors    import VocabProcessor, VQAAnswerProcessor

from torchvision import models

if  __name__ == '__main__':

    resnet152 = models.resnet152(pretrained = True)

    with open('/final/data/pythia.yaml') as f:
        config = yaml.load(f, Loader = yaml.FullLoader)

    config                  = ConfigNode(config)
    vqa_config              = config.task_attributes.vqa.dataset_attributes.vqa2
    text_processor_config   = vqa_config.processors.text_processor
    answer_processor_config = vqa_config.processors.answer_processor

    text_processor_config.params.vocab.vocab_file = '/final/data/vocabulary_100k.txt'
    answer_processor_config.params.vocab_file     = '/final/data/answers_vqa.txt'

    text_processor   = VocabProcessor(text_processor_config.params)
    answer_processor = VQAAnswerProcessor(answer_processor_config.params)
