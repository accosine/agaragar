# Poltergeist
A containered, open source, API first JAM Stack for building content management
systems - based on Docker, node.js, Redis, CouchDB, elasticsearch and HAProxy.

## Setup
The only thing you need on your machine to get started is docker (and
docker-compose).
Copy `example.env` to `.env` and change settings accordingly.
Create the necessary docker volumes:

    docker volume create --name=poltergeist_couchdb
    docker volume create --name=poltergeist_redis
    docker volume create --name=poltergeist_elasticsearch
    docker volume create --name=poltergeist_prodcerts


Generate self-signed SSL certificate for development:

    docker-compose -f docker-compose.admin.yml run certgen-dev


Generate valid SSL certificate via Letsencrypt:

    docker-compose -f docker-compose.admin.yml run -p 80:80 certgen-prod


Start the whole stack in development mode:

    docker-compose up --build


Setup CouchDB in development:

    docker-compose -f docker-compose.admin.yml run setup-couchdb-dev

OR

Setup CouchDB in production (only works with proper DNS record for your domain
and working SSL certificates, even self-signed):

    docker-compose -f docker-compose.admin.yml run setup-couchdb-prod

If you're on a Linux flavour, you have to raise the virtual memory max map
count:

    sysctl -w vm.max_map_count=262144


When you are ready, start the whole stack in production mode:

    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build


## System service
Move the poltergeist repository to /opt/poltergeist or make a symlink.
Install systemd services to start the poltergeist stack on boot:

    cp setup/systemd/poltergeist* /etc/systemd/system/
    systemctl enable poltergeist.service
    systemctl enable poltergeist-certgen-prod.timer
    systemctl daemon-reload
    systemctl start poltergeist.service
    systemctl start poltergeist-certgen-prod.timer


Check if your stytemd timer is working correctly (this will periodically renew
SSL certifiates if necessary via Letsencrypt):

    systemctl list-timers --all


# Backups
Make a backup of the databases and certificates:

    docker-compose -f docker-compose.admin.yml run backup-couchdb
    docker-compose -f docker-compose.admin.yml run backup-redis
    docker-compose -f docker-compose.admin.yml run backup-prodcerts


Restore a previously made backup:

    docker-compose -f docker-compose.admin.yml run restore-couchdb
    docker-compose -f docker-compose.admin.yml run restore-redis
    docker-compose -f docker-compose.admin.yml run restore-prodcerts


## Installation:
- script which will disable "Transparent Huge Pages" on the Docker host
  'echo never > /sys/kernel/mm/transparent_hugepage/enabled'
- TODO: /etc/hosts setup
- TODO: dnsmasq setup


## MacOS
Delete all .DS_Store files:

    find . -type f -name '*.DS_Store' -ls -delete


Attach to "Docker for Mac" Socket (press Enter to login)

    screen ~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux/tty


## Prior art (kinda)
- https://www.contentful.com
- https://prismic.io
- https://cosmicjs.com
- https://getdirectus.com
- https://getcockpit.com
- http://osmek.com


## Software stack
- Docker (1.13.0 (15072))
- Docker-Compose (1.10.0, build 4bd6f1a)
- hapi (15.2.0)
- HAProxy (Docker image: haproxy:1.7.2-alpine)
- CouchDB (Docker image: klaemo/couchdb:2.0.0)
- node.js (Docker image: node:7.6.0-alpine)
- Redis (Docker image: redis:3.2.7-alpine)
- elasticsearch (Docker image: docker.elastic.co/elasticsearch/elasticsearch:5.2.1)
- logstash (Docker image: logstash:5.2.1-alpine)

