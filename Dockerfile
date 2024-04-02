# vue npm build
FROM node:20.11.0-alpine as build

WORKDIR /app

COPY package.json /app/package.json

RUN npm install

COPY . /app

RUN npm run build


