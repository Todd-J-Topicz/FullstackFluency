FROM node:v19.7.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# This port is for our server file
EXPOSE 8000
CMD ["run"]

