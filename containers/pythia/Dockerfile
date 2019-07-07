  FROM nvidia/cuda:10.1-devel-ubuntu18.04

  RUN mkdir -p /final
  WORKDIR /final
  RUN mkdir -p /final/data
  RUN mkdir -p /final/pack
  RUN mkdir -p /final/work

  ENV LANG=C.UTF-8
  ARG DEBIAN_FRONTEND=noninteractive
  RUN apt update
  RUN apt install -yq apt-utils

  RUN apt install -yq wget git

  RUN apt install -yq python3-pip python3-dev
  RUN ln -s /usr/bin/python3 /usr/local/bin/python
  RUN ln -s /usr/bin/pip3 /usr/local/bin/pip
  RUN pip install --upgrade pip

  RUN mkdir -p /final/data
  RUN wget -qO /final/data/vocabulary_100k.txt      https://dl.fbaipublicfiles.com/pythia/data/vocabulary_100k.txt
  RUN wget -qO /final/data/answers_vqa.txt          https://dl.fbaipublicfiles.com/pythia/data/answers_vqa.txt
  RUN wget -qO /final/data/pythia.pth               https://dl.fbaipublicfiles.com/pythia/pretrained_models/vqa2/pythia_train_val.pth
  RUN wget -qO /final/data/pythia.yaml              https://dl.fbaipublicfiles.com/pythia/pretrained_models/vqa2/pythia_train_val.yml
  RUN wget -qO /final/data/detectron_model.pth      https://dl.fbaipublicfiles.com/pythia/detectron_model/detectron_model.pth
  RUN wget -qO /final/data/detectron_model.yaml     https://dl.fbaipublicfiles.com/pythia/detectron_model/detectron_model.yaml
  RUN wget -qO /final/data/detectron_weights.tar.gz https://dl.fbaipublicfiles.com/pythia/data/detectron_weights.tar.gz
  RUN tar   xf /final/data/detectron_weights.tar.gz -C /final/data

  RUN apt install -yq libsm6 libxext6 libxrender-dev

  RUN pip install torch
  RUN pip install opencv-python torchvision torchtext
  RUN pip install ninja yacs cython matplotlib demjson click
  RUN pip install git+https://github.com/cocodataset/cocoapi.git#subdirectory=PythonAPI

  RUN git clone https://github.com/facebookresearch/fastText.git /final/pack/fastText
  RUN pip install -e /final/pack/fastText

  RUN git clone https://github.com/facebookresearch/pythia.git /final/pack/pythia
  RUN sed -i '/torch/d' /final/pack/pythia/requirements.txt
  RUN pip install -e /final/pack/pythia

  RUN git clone https://gitlab.com/meetshah1995/vqa-maskrcnn-benchmark.git /final/pack/vqa-maskrcnn-benchmark
  WORKDIR /final/pack/vqa-maskrcnn-benchmark
  RUN python setup.py build
  RUN python setup.py develop
  WORKDIR /final

  WORKDIR /final/work
  COPY cache.py .
  RUN /final/work/cache.py
  WORKDIR /final

  RUN pip install flask flask-restful

  COPY app /final/app
  EXPOSE 5000
  WORKDIR /final/app

  COPY africa.jpg .
# RUN /final/app/cli.py --device cpu --image africa.jpg --question 'where is this place ?'

  WORKDIR /final/hot

  CMD ["./api.py", "--device", "cpu"]