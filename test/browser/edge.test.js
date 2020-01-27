/* eslint-disable no-restricted-globals, camelcase */
const browserTest = require('./browser-test');

browserTest('edge', 9001, [
  {
    browserName: 'Edge',
    browser_version: '18.0',
    os: 'Windows',
    os_version: '10',
  },
  {
    browserName: 'Edge',
    browser_version: '15.0',
    os: 'Windows',
    os_version: '10',
  },
]);
