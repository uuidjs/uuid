const config = require('./test/wdio.defaults').config;

exports.config = Object.assign(config, {

  capabilities: [
    { browserName: 'chrome', },
  ],

  services: [
    'static-server',
    'selenium-standalone',
  ],

});
