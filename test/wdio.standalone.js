const path = require('path');

let defaults = require(path.join(__dirname, 'wdio.defaults'));

exports.config = Object.assign(defaults.config, {

  capabilities: [
    { browserName: 'chrome', },
  ],

  services: [
    'static-server',
    'selenium-standalone',
  ],

});
