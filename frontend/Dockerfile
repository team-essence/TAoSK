FROM node:14.17.0

WORKDIR /front-server

ENV PATH /front-server/node_modules/.bin:$PATH

COPY package*.json /front-server/
RUN yarn

COPY . /front-server

CMD [ "yarn",  "start"]