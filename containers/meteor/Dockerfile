  FROM node:lts

# Setup Working Directory
  RUN mkdir -p /final/bin
  WORKDIR /final

# Install Meteor
  RUN curl https://install.meteor.com/ | sh
  ENV METEOR_ALLOW_SUPERUSER=true

# Upload Application
  ADD app /final/app
  WORKDIR /final/app
  RUN meteor npm install

# Enable Hot Code Reloading
# WORKDIR /final/hot

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
# ENV ROOT_URL="http://www.w251-final.com"
# WORKDIR /final/bin/bundle
# EXPOSE 80
# ENTRYPOINT ["node"]
# CMD ["main.js"]