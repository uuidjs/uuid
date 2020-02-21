/* eslint-disable no-restricted-globals, camelcase */
const browserTest = require('./browser-test');

browserTest('chrome', 9000, [
  {
    browserName: 'Chrome',
    browser_version: '80.0',
    os: 'Windows',
    os_version: '10',
  },
  {
    browserName: 'Chrome',
    browser_version: '49.0',
    os: 'Windows',
    os_version: '10',
  },
]);
