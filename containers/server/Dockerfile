FROM node:lts

RUN mkdir -p /final
WORKDIR /final

RUN npm install sails -g

ADD web web
WORKDIR /final/web
EXPOSE 1337

CMD ["sails", "lift"]