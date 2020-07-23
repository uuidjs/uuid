/* eslint-disable camelcase */

const PORT = 9000;
const PROJECT = process.env.GITHUB_REPOSITORY || 'node-uuid';
const GITHUB_SHA = process.env.GITHUB_SHA || '';
const GITHUB_REF = process.env.GITHUB_REF || '';
const BUILD = GITHUB_SHA || GITHUB_REF ? `${GITHUB_REF} ${GITHUB_SHA}` : 'manual build';

const commonCapabilities = {
  project: PROJECT,
  build: BUILD,
  name: 'browser test',
  'browserstack.local': true,
  'browserstack.debug': false,
  'browserstack.console': 'errors',
  resolution: '1024x768',
};

const capabilities = [
  // IE
  {
    ...commonCapabilities,
    browserName: 'IE',
    browser_version: '11.0',
    os: 'Windows',
    os_version: '10',
  },
  {
    ...commonCapabilities,
    browserName: 'IE',
    browser_version: '11.0',
    os: 'Windows',
    os_version: '7',
  },

  // Chrome
  {
    ...commonCapabilities,
    browserName: 'Chrome',
    browser_version: '81.0',
    os: 'Windows',
    os_version: '10',
  },
  {
    ...commonCapabilities,
    browserName: 'Chrome',
    browser_version: '49.0',
    os: 'Windows',
    os_version: '10',
  },

  // Firefox
  {
    ...commonCapabilities,
    browserName: 'Firefox',
    browser_version: '75.0',
    os: 'Windows',
    os_version: '10',
  },
  {
    ...commonCapabilities,
    browserName: 'Firefox',
    browser_version: '44.0',
    os: 'Windows',
    os_version: '10',
  },

  // Edge
  {
    ...commonCapabilities,
    browserName: 'Edge',
    browser_version: '81.0',
    os: 'Windows',
    os_version: '10',
  },
  {
    ...commonCapabilities,
    browserName: 'Edge',
    browser_version: '15.0',
    os: 'Windows',
    os_version: '10',
  },

  // Safari
  {
    ...commonCapabilities,
    browserName: 'Safari',
    browser_version: '13.0',
    os: 'OS X',
    os_version: 'Catalina',
  },
  {
    ...commonCapabilities,
    browserName: 'Safari',
    browser_version: '10.0',
    os: 'OS X',
    os_version: 'Sierra',
  },
];

exports.config = {
  specs: ['./test/browser/browser.spec.js'],

  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  services: [
    [
      'static-server',
      {
        folders: [{ mount: '/', path: './examples' }],
        port: PORT,
      },
    ],
    [
      'browserstack',
      {
        browserstackLocal: true,
      },
    ],
  ],

  runner: 'local',
  maxInstances: 5,

  capabilities,

  logLevel: 'warn',
  bail: 1,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 120000,
  },
  reporters: ['spec'],
};
