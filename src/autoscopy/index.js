// TODO: split routes into individual files
// TODO: don't hardcode 'article_' and 'page_' id prefixes

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/collections',
      config: {
        handler: (request, reply) => {
          reply(options.collections);
        },
      },
    },
    {
      method: 'GET',
      path: `/{page}`,
      config: {
        handler: (request, reply) => {
          server.methods
            .database()
            .get(
              'page_' + request.params.page,
              (err, body) => err ? reply(err) : reply(body)
            );
        },
      },
    },
  ]);

  for (let collectionpath in options.collections) {
    const collectionname = options.collections[collectionpath];
    server.route({
      method: 'GET',
      path: `/${collectionpath}`,
      config: {
        handler: (request, reply) => {
          server.methods
            .database()
            .view(
              'articles',
              'category',
              { key: collectionname },
              (err, body) => err ? reply(err) : reply(body)
            );
        },
      },
    });
    server.route({
      method: 'GET',
      path: `/${collectionpath}/{article}`,
      config: {
        handler: (request, reply) => {
          server.methods
            .database()
            .get(
              'article_' + request.params.article,
              (err, body) => err ? reply(err) : reply(body)
            );
        },
      },
    });
  }

  return next();
};

exports.register.attributes = {
  pkg: require('./package.json'),
};
