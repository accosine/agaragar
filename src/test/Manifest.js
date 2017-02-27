module.exports = {
  connections: [{
    port: 3000,
    labels: ['http']
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
        register: './test.js',
        options: {}
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

