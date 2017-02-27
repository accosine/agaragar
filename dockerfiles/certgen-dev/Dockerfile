from alpine:3.5

RUN apk add --no-cache openssl && rm -rf /var/cache/apk/*

WORKDIR /root

CMD openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
      -keyout cert.key -out cert.crt -subj '/CN=localhost/O=accosine' \
      && cat cert.crt cert.key > cert.pem && rm cert.key cert.crt .rnd

# CMD openssl req -x509 -newkey rsa:4096 -keyout key.pem \
#        -out cert.pem -days 365 -nodes -subj '/CN=localhost/O=accosine'
