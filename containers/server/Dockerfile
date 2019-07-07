FROM node:lts

    RUN mkdir -p /final
WORKDIR /final

RUN npm install sails -g

   COPY web /final/web
 EXPOSE 1337
WORKDIR /final/web

CMD ["sails", "lift"]