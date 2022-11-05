FROM node:lts-alpine

RUN mkdir -p /app
WORKDIR /app
COPY . /app

RUN cd /app && npm install
RUN npm run setup
