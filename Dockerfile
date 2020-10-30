FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY [".", "/app"]

EXPOSE 3000

CMD ["node","juego.js" ]