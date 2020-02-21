/* eslint-disable no-restricted-globals, camelcase */
const browserTest = require('./browser-test');

browserTest('firefox', 9002, [
  {
    browserName: 'Firefox',
    browser_version: '73.0',
    os: 'Windows',
    os_version: '10',
  },
  {
    browserName: 'Firefox',
    browser_version: '44.0',
    os: 'Windows',
    os_version: '10',
  },
]);
