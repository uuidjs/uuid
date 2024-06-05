const babelParser = require('@babel/eslint-parser');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const globals = require('globals');
const js = require('@eslint/js');
const neostandard = require('neostandard')({ semi: true, noStyle: true });

module.exports = [
  js.configs.recommended,
  ...neostandard,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.jest,
        ...globals.node,
        msCrypto: true,
      },
      parser: babelParser,
    },
  },
  {
    rules: {
      'no-var': ['error'],
      curly: ['error', 'all'],
    },
  },
  {
    ignores: [
      '!.babelrc.js',
      '.local/',
      '**/dist/',
      'node_modules/',
      // We have to ignore this until @babel/eslint-parser supports import assertions
      '**/package.mjs',
    ],
  },
];
