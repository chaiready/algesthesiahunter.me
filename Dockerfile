# Build
FROM node:12.13.1-alpine AS builder

ARG version
ENV VERSION ${version}

ADD . /code
WORKDIR /code
RUN mkdir -p /app/usr/local/openresty/nginx/html \
  && mkdir -p /app/usr/local/openresty/nginx/conf
RUN mv /code/nginx.conf /app/usr/local/openresty/nginx/conf/nginx.conf

RUN npm i yarn -g\
  && yarn \
  && npm run build \
  && mv /code/dist/* /app/usr/local/openresty/nginx/html/

# Main
FROM openresty/openresty:1.15.8.2-alpine
ARG gitCommit
ENV GIT_COMMIT ${gitCommit}

COPY --from=builder /app/ /
CMD echo "ui gitCommit:${GIT_COMMIT}" \
  && openresty -t \
  && openresty -g 'daemon off;'
