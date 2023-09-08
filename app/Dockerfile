FROM node:16-alpine AS dev

RUN apk update && apk add --no-cache bash

WORKDIR /application

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "index.js" ]
