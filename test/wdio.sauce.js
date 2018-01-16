const path = require('path');

let defaults = require(path.join(__dirname, 'wdio.defaults'));

const creds = defaults.getSauceCredentials();

exports.config = Object.assign(defaults.config, {

  // available browsers: https://saucelabs.com/platforms
  capabilities: [
    { browserName: 'internet explorer', version: 8, },
    { browserName: 'internet explorer', version: 9, },
    { browserName: 'internet explorer', version: 10, },
    { browserName: 'internet explorer', version: 11, },
    { browserName: 'firefox' },
    { browserName: 'chrome' },
    { browserName: 'safari' },
  ],

  sauceConnect: true,
  user: creds.user,
  key: creds.key,

  services: [
    'static-server',
    'sauce',
  ],

});
