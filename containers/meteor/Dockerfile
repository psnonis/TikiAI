  FROM node:lts

# Setup Working Directory
  RUN mkdir -p /final/bin
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
      python3 \
      python3-pip \
      vim \
      iputils-ping

# Install Meteor
  RUN curl https://install.meteor.com/ | sh
  ENV METEOR_ALLOW_SUPERUSER=true

# Upload Application
  ADD app /final/app
  WORKDIR /final/app

# Enable Hot Code Reloading
# WORKDIR /final/hot

# Clone Application from GitHub
  # RUN pip3 install requests
  # ADD gitUp.sh /final
  # ADD gitUp.py /final
  # RUN /final/gitUp.sh
  # WORKDIR /final/hub

# Install Application Dependencies
  RUN find . | sort
  RUN meteor npm install

# Development Entry Point
  EXPOSE 3000
  ENTRYPOINT ["meteor"]

# Build
# RUN meteor build /final/bin --directory
# RUN node --version
# RUN cat /final/bin/bundle/README
# RUN cd /final/bin/bundle/programs/server \
#  && npm install

# Production Entry Point
# ENV ROOT_URL="https://www.tiki.systems"
# WORKDIR /final/bin/bundle
# EXPOSE 80
# ENTRYPOINT ["node"]
# CMD ["main.js"]