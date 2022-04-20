FROM node:16.14.2-alpine as base

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .