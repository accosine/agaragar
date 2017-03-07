exports.register = (server, options, next) => {

  server.route([
    {
      method: 'GET',
      path: '/{category}/{article}',
      config: {
        handler: (request, reply) => {
          server.methods.database().get('article_' + request.params.article,
            (err, body) => err ? reply(err) : reply(body));
        }
      }
    },
    {
      method: 'GET',
      path: '/{category}',
      config: {
        handler: (request, reply) => {
          server.methods.database().view('articles', 'category', { key: request.params.category },
            (err, body) => err ? reply(err) : reply(body));
        }
      }
    }
  ]);

  return next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};

