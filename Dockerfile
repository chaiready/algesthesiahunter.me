# Build
FROM node:12.13.1-alpine AS builder

ARG version
ENV VERSION ${version}

ADD . /code
WORKDIR /code

RUN npm i yarn -g \
  && yarn \
  && yarn build

CMD yarn start
