FROM node:12

# Create app directory
WORKDIR /usr/src/socket

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 6969
CMD ["node","server.js" ]
