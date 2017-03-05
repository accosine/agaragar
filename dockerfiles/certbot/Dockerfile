from alpine:3.5

RUN apk add --no-cache certbot && rm -rf /var/cache/apk/*

CMD certbot certonly --agree-tos --email $LETSENCRYPT_EMAIL \
    -n --standalone --preferred-challenges http-01 \
    -d $DOMAIN -d www.$DOMAIN -d db.$DOMAIN -d search.$DOMAIN -d api.$DOMAIN && \
    cat /etc/letsencrypt/live/$DOMAIN/fullchain.pem /etc/letsencrypt/live/$DOMAIN/privkey.pem > /etc/letsencrypt/live/$DOMAIN/$DOMAIN.pem
