const nano = require('nano');

exports.register = (server, options, next) => {
  server.method(options.methodname, () => nano('http://' + options.user + ':' +
    options.password + '@' + options.hostname + ':' + options.port + '/' + options.database));
  next();
};

exports.register.attributes = {
  multiple: true,
  pkg: require('./package.json')
};
