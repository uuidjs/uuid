import js from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import neostandard from 'neostandard';
import tseslint from 'typescript-eslint';

const neostandardConfig = neostandard({ semi: true, noStyle: true });

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...neostandardConfig,
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
