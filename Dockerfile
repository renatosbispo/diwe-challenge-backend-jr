FROM node:16.14.2-slim as base

WORKDIR /app

# Install openssl as it's required for running prisma
# https://github.com/prisma/prisma/issues/7755#issuecomment-883658736
RUN apt-get -qy update && apt-get -qy install openssl

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/

COPY . .