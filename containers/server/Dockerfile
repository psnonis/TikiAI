FROM node:lts

    RUN mkdir -p /final
WORKDIR /final

RUN npm install sails -g

   COPY web .
WORKDIR /final/web
    CMD sails lift