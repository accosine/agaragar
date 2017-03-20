# Poltergeist
A containered, open source, API first JAM Stack for building content management
systems - based on Docker, node.js, Redis, CouchDB, elasticsearch and HAProxy.

## Setup
The only thing you need on your machine to get started is docker and
docker-compose.

### Development Setup
1.) Copy `example.env` to `.env` and change settings accordingly.

2.) Create the necessary docker volumes:

    docker volume create --name=poltergeist_couchdb
    docker volume create --name=poltergeist_redis
    docker volume create --name=poltergeist_elasticsearch
    docker volume create --name=poltergeist_prodcerts


3.) Generate self-signed SSL certificate for development:

    docker-compose -f docker-compose.admin.yml run certgen-dev


4.) Start the whole stack in development mode (and detach):

    docker-compose up --build -d


5.) Setup CouchDB in development:

    docker-compose -f docker-compose.admin.yml run setup-couchdb-dev


6.) Populate Database
If you have Markdown files with yaml frontmatter, you can directly import them
as documents into CouchDB.
Create the folder that will hold your Markdown documents:

    mkdir -p volumes/couchdb/import/articles
    mkdir -p volumes/couchdb/import/pages


Copy Markdown files into the corresponding folder and import them (this only
works locally in development mode):

    docker-compose -f docker-compose.admin.yml run import-couchdb-articles
    docker-compose -f docker-compose.admin.yml run import-couchdb-pages

7.) If you're on a Linux flavour, you have to raise the virtual memory max map
count and disable `Transparent Huge Pages` on the Docker host:

    sysctl -w vm.max_map_count=262144
    echo never > /sys/kernel/mm/transparent_hugepage/enabled


8.) Install node.js packages via Lerna:

    docker-compose -f docker-compose.admin.yml run setup-api-dev


9.) Restart the whole stack with everything set up:

    docker-compose down && docker-compose up --build


10.) Make the stack locally accessible via (sub-)domain in your hosts file:

    127.0.0.1 example.com
    127.0.0.1 db.example.com
    127.0.0.1 search.example.com
    127.0.0.1 api.example.com

- TODO: dnsmasq setup

---

### Production Setup

0.) Set A-Records for the following subdomains: `api`, `db`,`search` and let
them propagate.

1.) Copy `example.env` to `.env` and change settings accordingly.

2.) Create the necessary docker volumes:

    docker volume create --name=poltergeist_couchdb
    docker volume create --name=poltergeist_redis
    docker volume create --name=poltergeist_elasticsearch
    docker volume create --name=poltergeist_prodcerts


3.) Generate valid SSL certificate via Letsencrypt:

    docker-compose -f docker-compose.admin.yml run -p 80:80 certgen-prod

4.) Start the whole stack in production mode:

    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build


5.) Setup CouchDB:
This only works with proper DNS record for your domain and working SSL
certificates (even if self-signed):

    docker-compose -f docker-compose.admin.yml run setup-couchdb-prod


6.) Populate Database
If you have Markdown files with yaml frontmatter, you can directly import them
as documents into CouchDB.
Create the folder that will hold your Markdown documents:

    mkdir -p volumes/couchdb/import


Copy Markdown files into the import folder and import them (this only works
locally):

    docker-compose -f docker-compose.admin.yml run import-couchdb-data


7.) If you're on a Linux flavour, you have to raise the virtual memory max map
count and disable "Transparent Huge Pages" on the Docker host:

    sysctl -w vm.max_map_count=262144
    echo never > /sys/kernel/mm/transparent_hugepage/enabled


8.) Install node.js packages via Lerna:

    docker-compose -f docker-compose.admin.yml run setup-api-dev


9.) Restart the whole stack with everything set up:

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
    docker-compose -f docker-compose.admin.yml run backup-elasticsearch
    docker-compose -f docker-compose.admin.yml run backup-prodcerts


Restore a previously made backup:

    docker-compose -f docker-compose.admin.yml run restore-couchdb
    docker-compose -f docker-compose.admin.yml run restore-redis
    docker-compose -f docker-compose.admin.yml run restore-elasticsearch
    docker-compose -f docker-compose.admin.yml run restore-prodcerts


## MacOS
Delete all .DS_Store files:

    find . -type f -name '*.DS_Store' -ls -delete


Attach to "Docker for Mac" Socket (press Enter to login)

    screen ~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux/tty


## Software stack
- Docker (1.13.0 (15072))
- Docker-Compose (1.10.0, build 4bd6f1a)
- node.js (Docker image: node:7.6.0-alpine)
- Lerna (2.0.0-beta.38)
- hapi (15.2.0)
- HAProxy (Docker image: haproxy:1.7.2-alpine)
- CouchDB (Docker image: klaemo/couchdb:2.0.0)
- Redis (Docker image: redis:3.2.7-alpine)
- elasticsearch (Docker image: docker.elastic.co/elasticsearch/elasticsearch:5.2.1)
- logstash (Docker image: logstash:5.2.1-alpine)


## Prior art (kinda)
- https://www.contentful.com
- https://prismic.io
- https://cosmicjs.com
- https://getdirectus.com
- https://getcockpit.com
- http://osmek.com

## License

Poltergeist is BSD licensed.

