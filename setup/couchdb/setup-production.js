console.log(JSON.stringify(process.env));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
if (!process.env.DOMAIN ||
    !process.env.COUCHDB_HOSTNAME ||
    !process.env.COUCHDB_USER||
    !process.env.COUCHDB_PASSWORD ||
    !process.env.COUCHDB_DATABASE) {
  throw new Error('Missing environment variables');
}
const https = require("https");

const {
  DOMAIN: domain,
  COUCHDB_HOSTNAME: hostname,
  COUCHDB_USER: user,
  COUCHDB_PASSWORD: password,
  COUCHDB_DATABASE: database,
} = process.env;

function request(hostname, auth, path, method) {
  const options = {
    hostname,
    port: 443,
    auth,
    path,
    method,
    headers: { 'Content-Type': 'application/json' }
  };

  const req = https.request(options, (res) => {
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

request(hostname + '.' + domain, user + ':' + password, '/_global_changes', 'PUT');
request(hostname + '.' + domain, user + ':' + password, '/_metadata', 'PUT');
request(hostname + '.' + domain, user + ':' + password, '/_replicator', 'PUT');
request(hostname + '.' + domain, user + ':' + password, '/_users', 'PUT');

request(hostname + '.' + domain, user + ':' + password, '/' + database, 'PUT');
