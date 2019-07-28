# Initial Container
  FROM pytorch/pytorch:1.1.0-cuda10.0-cudnn7.5-devel

# Setup Working Directory
  RUN mkdir -p /final/data \
   && mkdir -p /final/pack
   WORKDIR /final

# Install Utilities
  ENV LANG=C.UTF-8 \
      PATH=${PATH}:.
  ARG DEBIAN_FRONTEND=noninteractive
  RUN apt update \
   && apt install -yq apt-utils wget curl git

# Download Training Data
  RUN wget -qO /final/data/vocabulary_100k.txt      https://dl.fbaipublicfiles.com/pythia/data/vocabulary_100k.txt \
   && wget -qO /final/data/answers_vqa.txt          https://dl.fbaipublicfiles.com/pythia/data/answers_vqa.txt \
   && wget -qO /final/data/pythia.pth               https://dl.fbaipublicfiles.com/pythia/pretrained_models/vqa2/pythia_train_val.pth \
   && wget -qO /final/data/pythia.yaml              https://dl.fbaipublicfiles.com/pythia/pretrained_models/vqa2/pythia_train_val.yml \
   && wget -qO /final/data/detectron_model.pth      https://dl.fbaipublicfiles.com/pythia/detectron_model/detectron_model.pth \
   && wget -qO /final/data/detectron_model.yaml     https://dl.fbaipublicfiles.com/pythia/detectron_model/detectron_model.yaml \
   && wget -qO /final/data/detectron_weights.tar.gz https://dl.fbaipublicfiles.com/pythia/data/detectron_weights.tar.gz \
   && tar   xf /final/data/detectron_weights.tar.gz -C /final/data

# Install OpenCV
  RUN apt install -yq \
      libsm6 \
      libxext6 \
      libxrender-dev \
      libgtk2.0-dev \
      libavcodec-dev \
      libavformat-dev \
      libswscale-dev \
   && pip install opencv-python

# Nvidia PyTorch Mixed-Precision Extension
  RUN git clone https://github.com/NVIDIA/apex.git /final/pack/apex \
   && cd /final/pack/apex \
   && python setup.py install --cuda_ext --cpp_ext

# Install PyTorch
  RUN pip install torchvision torchtext

# Install Dependencies
  RUN pip install ninja yacs cython matplotlib demjson \
   && pip install git+https://github.com/cocodataset/cocoapi.git#subdirectory=PythonAPI

# Install FastText
  RUN git clone https://github.com/facebookresearch/fastText.git /final/pack/fastText \
   && pip install -e /final/pack/fastText

# Install Mask-RCNN for VQA
  RUN git clone https://gitlab.com/meetshah1995/vqa-maskrcnn-benchmark.git /final/pack/vqa-maskrcnn-benchmark \
   && pip install -e /final/pack/vqa-maskrcnn-benchmark

# Install Pythia
  RUN git clone https://github.com/facebookresearch/pythia /final/pack/pythia
  WORKDIR /final/pack/pythia
  RUN python setup.py develop

# Cache Model Weights
  WORKDIR /final
  ADD cache.py .
  RUN cache.py

# Upload Application
  RUN pip install flask click
  ADD app /final/app
  WORKDIR /final/app

# Enable Hot Code Reloading
# WORKDIR /final/hot

# Sanity Check
  #RUN cli.py --device cpu  --image africa.jpg --question 'where is this place ?'
  #RUN cli.py --device cuda --image africa.jpg --question 'where is this place ?'
  #RUN nvidia-smi

# Entry Point
  EXPOSE 5000
  ENTRYPOINT ["api.py"]
  CMD ["--device", "cuda"]