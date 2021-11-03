FROM node:14.17.0

RUN yarn global add @nestjs/core

WORKDIR /api-server
COPY package*.json /api-server/

RUN yarn 
CMD [ "yarn", "run", "start:dev"]