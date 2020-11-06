FROM node:12

# Create app directory
WORKDIR /usr/src/game

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3001
CMD ["node","juego.js" ]