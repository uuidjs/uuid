const babelParser = require('@babel/eslint-parser');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const globals = require('globals');
const js = require('@eslint/js');
const neostandard = require('neostandard')({ semi: true, noStyle: true });
const tseslint = require('typescript-eslint');

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
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
    },
  },
  {
    rules: {
      '@typescript-eslint/no-redeclare': 'error',
      '@typescript-eslint/no-require-imports': 'off',
      'no-redeclare': 'off',
      'no-var': ['error'],
      curly: ['error', 'all'],
    },
  },
  {
    ignores: [
      'eslint.config.cjs',
      '!.babelrc.js',
      '.local/',
      '**/dist/',
      'node_modules/',
      // We have to ignore this until @babel/eslint-parser supports import assertions
      '**/package.mjs',
    ],
  },
];
