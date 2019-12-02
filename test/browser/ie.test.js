/* eslint-disable no-restricted-globals, camelcase */
const browserTest = require('./browser-test');

browserTest('ie', 9003, [
  {
    browserName: 'IE',
    browser_version: '11.0',
    os: 'Windows',
    os_version: '10',
  },
  {
    browserName: 'IE',
    browser_version: '11.0',
    os: 'Windows',
    os_version: '7',
  },
]);
