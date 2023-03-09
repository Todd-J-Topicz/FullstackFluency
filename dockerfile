FROM node:18.7.0
WORKDIR /FullstackFluency
COPY package*.json ./
RUN npm install - g nodemon
RUN npm install
COPY . .
# This port is for our server file
EXPOSE 8000
CMD ["nodemon", "server.js"]