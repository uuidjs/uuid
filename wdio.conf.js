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
  // Chrome Latest
  {
    browserName: 'Chrome',
    browserVersion: 'latest',

    'bstack:options': {
      ...commonCapabilities,
      os: 'Windows',
      osVersion: '11',
    },
  },

  // Firefox Latest
  {
    browserName: 'Firefox',
    browserVersion: 'latest',

    'bstack:options': {
      ...commonCapabilities,
      os: 'Windows',
      osVersion: '11',
    },
  },

  // Edge Latest
  {
    browserName: 'Edge',
    browserVersion: 'latest',

    'bstack:options': {
      ...commonCapabilities,
      os: 'Windows',
      osVersion: '11',
    },
  },

  // Safari Latest
  {
    browserName: 'Safari',
    browserVersion: 'latest',

    'bstack:options': {
      ...commonCapabilities,
      os: 'OS X',
      osVersion: 'Monterey',
    },
  },
];

export const config = {
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
