var fs = require('fs')
  , path = require('path')
  , nano = require('nano')
  , matter = require('gray-matter');

const {
  DOMAIN: domain,
  COUCHDB_HOSTNAME: hostname,
  COUCHDB_USER: user,
  COUCHDB_PASSWORD: password,
  COUCHDB_PORT: port,
  COUCHDB_DATABASE: database,
  COUCHDB_ARTICLE_PREFIX: prefix,
} = process.env;

const couch = nano('http://' + user + ':' + password + '@' + hostname + ':' + port);
const db = couch.use(database);

const dir = path.join(__dirname, 'import');
const files = fs.readdirSync(dir);

const articles = { docs: []};
for (file of files) {
  const filename = file.split('.');
  const fileextension = filename[filename.length - 1];
  if (fileextension === 'md') {
    const doc = matter.read(path.join(dir, file));
    articles.docs.push(Object.assign({}, doc.data, {
      "_id": '' + prefix + doc.data.slug,
      "content": doc.content
    }));
  }
}

db.bulk(articles, (err, body, header) => {
  if (err) throw err;
  console.log(body);
});
