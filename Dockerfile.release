# Build
FROM node:12.13.1-alpine AS builder

ARG version
ENV VERSION ${version}

ADD . /code
WORKDIR /code

RUN mkdir -p /app

RUN npm i yarn -g\
  && yarn\
  && npm run build\
  && mv /code/.nuxt /app\
  && mv /code/package.json /app\
  && mv /code/node_modules /app

# Main
FROM node:12.13.1-alpine
ARG gitCommit
ENV GIT_COMMIT ${gitCommit}

COPY --from=builder /app /

WORKDIR /app
RUN npm i yarn -g\
  && yarn \
  && npm run start
