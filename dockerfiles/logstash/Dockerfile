FROM logstash:5.2.1-alpine

RUN sed -i 's/\/dev\/random/\/dev\/urandom/g' $JAVA_HOME/lib/security/java.security

COPY logstash-input-couchdb_changes-3.1.1.gem /
RUN logstash-plugin install --no-verify logstash-input-couchdb_changes-3.1.1.gem

COPY logstash.conf /usr/local/etc/logstash/

CMD ["-f", "/usr/local/etc/logstash/logstash.conf"]
