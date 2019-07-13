  FROM node:lts

# Setup Working Directory
  RUN mkdir -p /final
  WORKDIR /final

# Install Meteor
  RUN curl https://install.meteor.com/ | sh
  ENV METEOR_ALLOW_SUPERUSER=1

# Upload Application
  ADD app /final/app
  WORKDIR /final/app

# Enable Hot Code Reloading
# WORKDIR /final/hot

# Cache
  RUN meteor npm install

# Entry Point
  EXPOSE 3000
  ENTRYPOINT ["meteor"]