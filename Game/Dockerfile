FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY [".", "/app"]

EXPOSE 3000

CMD ["node","juego.js" ]