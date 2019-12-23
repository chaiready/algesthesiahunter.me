# Build
FROM node:12.13.1-alpine AS builder

ARG version
ENV VERSION ${version}

ADD . /code
WORKDIR /code
RUN mkdir -p /code/dist \
  && mkdir -p /app/data/cache \
  && mkdir -p /app/usr/share/nginx/html \
  RUN mkdir -p /app/etc/nginx/conf.d \
  && mv /code/default.conf /app/etc/nginx/conf.d

RUN npm i \
  npm run build \
  && mv /code/dist/* /app/usr/share/nginx/html/

# Main
FROM openresty/openresty:1.15.8.2-alpine
ARG gitCommit
ENV GIT_COMMIT ${gitCommit}

COPY --from=builder /app/ /
CMD echo "ui gitCommit:${GIT_COMMIT}" \
  && openresty -g 'daemon off;'
