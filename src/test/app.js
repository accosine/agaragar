exports.register = (server, options, next) => {

  server.route([
    {
      method: 'GET',
      path: '/allprod',
      config: {
        handler: (request, reply) => {
          server.methods.database().get('article_erfolgreicher-als-jedes-katzenvideo',
            (err, body) => {
              if (err) {
                reply(err);
              } else {
                reply(body);
              }
          });

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

