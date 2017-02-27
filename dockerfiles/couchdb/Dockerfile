FROM  klaemo/couchdb:2.0.0

COPY local.ini /opt/couchdb/etc/local.d/
COPY vm.args /opt/couchdb/etc/

ENTRYPOINT ["tini", "--", "/docker-entrypoint.sh"]
CMD ["/opt/couchdb/bin/couchdb"]
