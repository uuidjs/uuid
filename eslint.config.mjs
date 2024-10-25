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
    ignores: ['eslint.config.cjs', '.local/', '**/dist/', 'node_modules/'],
  },
];
