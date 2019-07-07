  FROM node:lts

  RUN mkdir -p /final
  WORKDIR /final

  RUN npm install sails -g

  COPY app /final/app
  EXPOSE 1337
  WORKDIR /final/app

  WORKDIR /final/hot

  CMD ["sails", "lift"]