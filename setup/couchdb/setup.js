const transport = process.env.NODE_ENV === 'production' ?
  require('https') :
  require('http');

const {
  DOMAIN: domain,
  COUCHDB_HOSTNAME: hostname,
  COUCHDB_USER: user,
  COUCHDB_PASSWORD: password,
  COUCHDB_DATABASE: database,
  COUCHDB_PORT: port
} = process.env;

const fqdn = process.env.NODE_ENV === 'production' ?
  hostname + '.' + domain : hostname;

const articles = {
  "_id" : "_design/articles",
    "views" : {
      "category" : {
        "map" : "function(doc) { emit(doc.collection, doc); }"
      }
    }
};

function request(hostname, auth, path, method, port, body) {
  const options = {
    hostname,
    port,
    auth,
    path,
    method,
    headers: { 'Content-Type': 'application/json' }
  };

  const req = transport.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (body) => {
      console.log(body);
    });
  });
  req.on('error', (e) => {
    console.log('problem with request: ' + e.message);
  });
  if (body) {
    // write data to request body
    req.write(JSON.stringify(body));
  }
  req.end();
}

request(fqdn, user + ':' + password, '/_global_changes', 'PUT', port);
request(fqdn, user + ':' + password, '/_metadata', 'PUT', port);
request(fqdn, user + ':' + password, '/_replicator', 'PUT', port);
request(fqdn, user + ':' + password, '/_users', 'PUT', port);
request(fqdn, user + ':' + password, '/' + database, 'PUT', port);
request(fqdn, user + ':' + password, '/' + database + '/' + '_design/articles', 'PUT', port, articles);

// TODO: create unpriviledged CouchDB user
