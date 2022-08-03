/* eslint-disable camelcase */

const PORT = 9000;
const PROJECT = process.env.GITHUB_REPOSITORY || 'node-uuid';
const GITHUB_SHA = process.env.GITHUB_SHA || '';
const GITHUB_REF = process.env.GITHUB_REF || '';
const BUILD = GITHUB_SHA || GITHUB_REF ? `${GITHUB_REF} ${GITHUB_SHA}` : 'manual build';

const commonCapabilities = {
  projectName: PROJECT,
  buildName: BUILD,
  sessionName: 'browser test',
  resolution: '1024x768',
};

const capabilities = [
  // Chrome
  // Latest
  {
    'bstack:options': {
      ...commonCapabilities,
      os: 'Windows',
      osVersion: '11',
    },
    browserName: 'Chrome',
    browserVersion: '103.0',
  },
  // Chrome 92 introduced native support for crypto.randomUUID
  {
    'bstack:options': {
      ...commonCapabilities,
      os: 'Windows',
      osVersion: '11',
    },
    browserName: 'Chrome',
    browserVersion: '92.0',
  },
  // Chrome 49 released on 2016-03-02 was the last version supported on Windows XP, Windows Vista, Mac OS X 10.6, 10.7, and 10.8
  {
    'bstack:options': {
      ...commonCapabilities,
      os: 'Windows',
      osVersion: '10',
    },
    browserName: 'Chrome',
    browserVersion: '49.0',
  },

  // Firefox
  // Latest
  {
    'bstack:options': {
      ...commonCapabilities,
      os: 'Windows',
      osVersion: '11',
    },
    browserName: 'Firefox',
    browserVersion: '103.0',
  },
  // Firefox 51 was the first Firefox to correctly support const/let
  {
    'bstack:options': {
      ...commonCapabilities,
      os: 'Windows',
      osVersion: '10',
    },
    browserName: 'Firefox',
    browserVersion: '51.0',
  },

  // Edge
  {
    'bstack:options': {
      ...commonCapabilities,
      os: 'Windows',
      osVersion: '11',
    },
    browserName: 'Edge',
    browserVersion: '103.0',
  },
  // While Edge 12 already supported const/let, Edge 15 is the earliest Edge available on
  // Browserstack
  {
    'bstack:options': {
      ...commonCapabilities,
      os: 'Windows',
      osVersion: '10',
    },
    browserName: 'Edge',
    browserVersion: '15.0',
  },

  // Safari
  {
    'bstack:options': {
      ...commonCapabilities,
      os: 'OS X',
      osVersion: 'Monterey',
    },
    browserName: 'Safari',
    browserVersion: '15.0',
  },
  // Safari 11 was the first Safari to correctly support const/let
  {
    'bstack:options': {
      ...commonCapabilities,
      os: 'OS X',
      osVersion: 'High Sierra',
    },
    browserName: 'Safari',
    browserVersion: '11.0',
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
  jasmineOpts: {
    defaultTimeoutInterval: 120000,
  },
  reporters: ['spec'],
};
