  FROM nvidia/cuda:10.1-devel-ubuntu18.04
# FROM pytorch/pytorch:1.1.0-cuda10.0-cudnn7.5-devel

  RUN mkdir -p /final/data \
   && mkdir -p /final/pack
  
  WORKDIR /final

  ENV LANG=C.UTF-8 \
      PATH=${PATH}:.
  ARG DEBIAN_FRONTEND=noninteractive
  RUN apt update \
   && apt install -yq apt-utils wget git

  RUN apt install -yq python3-pip python3-dev \
   && ln -s /usr/bin/python3 /usr/local/bin/python \
   && ln -s /usr/bin/pip3 /usr/local/bin/pip \
   && pip install --upgrade pip

  RUN wget -qO /final/data/vocabulary_100k.txt      https://dl.fbaipublicfiles.com/pythia/data/vocabulary_100k.txt \
   && wget -qO /final/data/answers_vqa.txt          https://dl.fbaipublicfiles.com/pythia/data/answers_vqa.txt \
   && wget -qO /final/data/pythia.pth               https://dl.fbaipublicfiles.com/pythia/pretrained_models/vqa2/pythia_train_val.pth \
   && wget -qO /final/data/pythia.yaml              https://dl.fbaipublicfiles.com/pythia/pretrained_models/vqa2/pythia_train_val.yml \
   && wget -qO /final/data/detectron_model.pth      https://dl.fbaipublicfiles.com/pythia/detectron_model/detectron_model.pth \
   && wget -qO /final/data/detectron_model.yaml     https://dl.fbaipublicfiles.com/pythia/detectron_model/detectron_model.yaml \
   && wget -qO /final/data/detectron_weights.tar.gz https://dl.fbaipublicfiles.com/pythia/data/detectron_weights.tar.gz \
   && tar   xf /final/data/detectron_weights.tar.gz -C /final/data

  RUN apt install -yq libsm6 libxext6 libxrender-dev \
   && pip install torch \
   && pip install opencv-python torchvision torchtext \
   && pip install ninja yacs cython matplotlib demjson click \
   && pip install git+https://github.com/cocodataset/cocoapi.git#subdirectory=PythonAPI

  RUN git clone https://github.com/facebookresearch/fastText.git /final/pack/fastText \
   && pip install -e /final/pack/fastText

  RUN git clone https://github.com/facebookresearch/pythia.git /final/pack/pythia \
   && sed -i '/torch/d' /final/pack/pythia/requirements.txt \
   && pip install -e /final/pack/pythia

  RUN git clone https://gitlab.com/meetshah1995/vqa-maskrcnn-benchmark.git /final/pack/vqa-maskrcnn-benchmark \
   && cd /final/pack/vqa-maskrcnn-benchmark \
   && python setup.py build \
   && python setup.py develop

  RUN pip install flask flask-restful

  ADD cache.py .
  RUN cache.py

  ADD app /final/app

  WORKDIR /final/app
# WORKDIR /final/hot # hot code reload

# RUN cli.py --device cpu --image africa.jpg --question 'where is this place ?'

  EXPOSE 5000
  ENTRYPOINT ["api.py"]
  CMD ["--device", "cpu"]