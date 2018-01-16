const path = require('path');
const chai = require('chai');

exports.getSauceCredentials = function() {

  let creds;

  try {
    creds = require(path.join(__dirname, '..', 'user.json'));
  } catch (e) {
    creds = {
      user: process.env.SAUCE_USERNAME,
      key: process.env.SAUCE_ACCESS_KEY,
    };
  }

  console.assert(creds.user, "Missing Sauce Labs username");
  console.assert(creds.key, "Missing Sauce Labs access key");

  return creds;
};

exports.config = {

  before: function (capabilities, specs) {
    global.expect = chai.expect;
    const session = browser.session().value;
    global.agent = `${session.browserName} ${session.browserVersion}`;
    if (process.env.TRAVIS_BUILD_NUMBER) {
      // enables saucelab badges
      capabilities.public = true;
      capabilities.build = process.env.TRAVIS_BUILD_NUMBER;
    }
  },

  baseUrl: 'http://localhost:4567',

  logLevel: 'error',

  framework: 'mocha',

  reporters: ['spec'],

  specs: [
    path.join(__dirname, 'specs/**/*-spec.js')
  ],

  staticServerFolders: [
     { mount: '/', path: path.join(__dirname, '..') }
   ],

};
