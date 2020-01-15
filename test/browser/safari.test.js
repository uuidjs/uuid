/* eslint-disable no-restricted-globals, camelcase */
const browserTest = require('./browser-test');

browserTest('safari', 9004, [
  {
    browserName: 'Safari',
    browser_version: '13.0',
    os: 'OS X',
    os_version: 'Catalina',
  },
  {
    browserName: 'Safari',
    browser_version: '10.0',
    os: 'OS X',
    os_version: 'Sierra',
  },
]);
