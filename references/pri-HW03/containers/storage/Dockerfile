  FROM ubuntu:18.04

  MAINTAINER priyankara.nonis@berkeley.edu
 
  WORKDIR /

  RUN apt-get update
  RUN apt-get install -y apt-utils
  RUN apt-get install -y software-properties-common
  RUN apt-get install -y curl
  RUN apt-get install -y git
  RUN apt-get install -y python3.6
  RUN apt-get install -y python3-pip
  RUN apt-get install -y libsm6
  RUN apt-get install -y libxext6
  RUN apt-get install -y libxrender-dev
  RUN apt-get install -y mosquitto
  RUN apt-get install -y mosquitto-clients

  RUN pip3 install paho-mqtt
  RUN pip3 install opencv-python
  RUN pip3 install ibm-cos-sdk