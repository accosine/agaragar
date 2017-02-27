FROM docker.elastic.co/elasticsearch/elasticsearch:5.2.1

RUN mv /usr/share/elasticsearch/plugins/x-pack /usr/share/elasticsearch/plugins/.removing-x-pack && \
    mv /usr/share/elasticsearch/plugins/.removing-x-pack /usr/share/elasticsearch/plugins/x-pack && \
    eval ${ES_JAVA_OPTS:-} elasticsearch-plugin remove x-pack
