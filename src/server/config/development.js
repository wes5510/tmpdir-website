const path = require('path');

module.exports = {
  name: 'tmpdir-dev',
  server: {
    port: 443,
    ssl: {
      key: path.resolve(__dirname, '../../certs/server.key'),
      cert: path.resolve(__dirname, '../../certs/server.cert'),
    },
  },
  tmpdir: {
    service: {
      upload: {
        protocol: 'http',
        hostname: 'dev.sw-warehouse.xyz',
        port: 6000,
      },
      download: {
        protocol: 'http',
        hostname: 'dev-tmpdir-filedownload.run.goorm.io',
        port: 80,
      },
    },
    file: {
      expireTermDay: 1,
      maxSize: 1000 * 1000 * 1000,
      tempPath: '/tmp',
    },
  },
  log: {
    path: path.resolve(__dirname, '../../logs'),
    filename: 'tmpdir-website-dev',
    level: {
      console: 'debug',
      express: 'error',
    },
    fileDateFormat: '%Y%m%d%H',
  },
  dependency: {
    css: ['bootstrap/dist/css/bootstrap.min.css'],
  },
  manifest: path.resolve(__dirname, '../../build/manifest.json'),
};
