exports.register = function (server, options, next) {

  server.route([
    {
      method: 'GET',
      path: '/allprod',
      config: {
        handler: () => {
          console.log('jappooo');
        }
        //validate: require('../validation/product').get,
        //auth: 'session'
      }
    }
  ]);

  return next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};

