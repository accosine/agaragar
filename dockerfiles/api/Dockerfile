FROM node:7.6.0-alpine

RUN addgroup -S app && adduser -S -g app app 

RUN apk add --no-cache 'su-exec>=0.2'

ENV HOME=/home/app

COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]

WORKDIR $HOME/api

CMD ["npm", "start"]
