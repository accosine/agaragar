module.exports = {
  connections: [{
    port: 8080,
    labels: ['http'],
    host: process.env.HOSTNAME
  }],
  server: {
    app: {
      slogan: 'We push the web forward'
    }
  },
  registrations: {
    $filter: 'env',
    $base: [{
      plugin: {
        register: '../autoscopy',
        options: {
          collections: JSON.parse(process.env.API_COLLECTIONS)
        }
      },
    },
    {
      plugin: {
        register: '../asport',
        options: {
          methodname: 'database',
          hostname: process.env.COUCHDB_HOSTNAME,
          database: process.env.COUCHDB_DATABASE,
          port: process.env.COUCHDB_PORT,
          user: process.env.COUCHDB_USER,
          password: process.env.COUCHDB_PASSWORD
        }
      }
    }

    ],
    production: [{
      plugin: {
        register: 'good',
        options: {
          ops: {
            interval: '10000'
          },
          reporters: {
            myConsoleReporter: [{
              module: 'good-console'
            }, 'stdout']
          }
        }
      }
    }],
    $default: [{
      plugin: {
        register: 'good',
        options: {
          ops: {
            interval: '1000'
          },
          reporters: {
            myConsoleReporter: [{
              module: 'good-console'
            }, 'stdout']
          }
        }
      }
    },
    {
      plugin: {
        register: 'blipp',
        options: {}
      }
    }]
  }
};

