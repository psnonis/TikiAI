# Interpreter Flask Server Docker File

    FROM ubuntu

    # Setup Working Directory
    RUN mkdir -p /final
    WORKDIR /final

    ENV LANG=C.UTF-8 \
        PATH=${PATH}:.
    ARG DEBIAN_FRONTEND=noninteractive

    RUN apt-get update && apt-get install -y apt-utils

    RUN apt-get update
    RUN apt-get install -y software-properties-common
    RUN apt-get update && apt-get install -y \
        curl \
        git \
        python3.6 \
        python3-pip \
        vim \
        iputils-ping

# Upload Application
  RUN apt-get install libasound-dev portaudio19-dev -y
  RUN pip3 install flask click gunicorn pandas numpy SpeechRecognition 
  RUN pip3 install pyaudio
  ADD app /final/app
  WORKDIR /final/app

# Sanity Check
  RUN cli.py --audio sample_audio.wav

# Entry Point
  EXPOSE 5001
  ENTRYPOINT ["api.py"]