if (!process.env.COUCHDB_HOSTNAME ||
    !process.env.COUCHDB_PORT||
    !process.env.COUCHDB_USER||
    !process.env.COUCHDB_PASSWORD ||
    !process.env.COUCHDB_DATABASE) {
  throw new Error('Missing environment variables');
}
const http = require("http");

const {
  COUCHDB_HOSTNAME: hostname,
  COUCHDB_USER: user,
  COUCHDB_PASSWORD: password,
  COUCHDB_DATABASE: database,
  COUCHDB_PORT: port
} = process.env;

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

  const req = http.request(options, (res) => {
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
request(hostname, user + ':' + password, '/_global_changes', 'PUT', port);
request(hostname, user + ':' + password, '/_metadata', 'PUT', port);
request(hostname, user + ':' + password, '/_replicator', 'PUT', port);
request(hostname, user + ':' + password, '/_users', 'PUT', port);
request(hostname, user + ':' + password, '/' + database, 'PUT', port);
request(hostname, user + ':' + password, '/' + database + '/' + '_design/articles', 'PUT', port, articles);

// TODO: create unpriviledged CouchDB user
