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

function request(hostname, auth, path, method, port) {
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
  // write data to request body
  // req.write('{"string": "Hello, World"}');
  req.end();
}
request(hostname, user + ':' + password, '/_global_changes', 'PUT', port);
request(hostname, user + ':' + password, '/_metadata', 'PUT', port);
request(hostname, user + ':' + password, '/_replicator', 'PUT', port);
request(hostname, user + ':' + password, '/_users', 'PUT', port);

request(hostname, user + ':' + password, '/' + database, 'PUT', port);
