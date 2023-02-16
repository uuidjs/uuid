const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');

const plugins = [nodeResolve({ browser: true }), terser()];
module.exports = [
  {
    input: './example-all.js',
    output: {
      file: 'dist/all.js',
      format: 'iife',
    },
    plugins,
  },
  {
    input: './example-v1.js',
    output: {
      file: 'dist/v1.js',
      format: 'iife',
    },
    plugins,
  },
  {
    input: './example-v4.js',
    output: {
      file: 'dist/v4.js',
      format: 'iife',
    },
    plugins,
  },
  {
    input: './example-v7.js',
    output: {
      file: 'dist/v7.js',
      format: 'iife',
    },
    plugins,
  },

  {
    input: './size-v1.js',
    output: {
      file: 'dist/v1-size.js',
      format: 'cjs',
    },
    plugins,
  },
  {
    input: './size-v3.js',
    output: {
      file: 'dist/v3-size.js',
      format: 'cjs',
    },
    plugins,
  },
  {
    input: './size-v4.js',
    output: {
      file: 'dist/v4-size.js',
      format: 'cjs',
    },
    plugins,
  },
  {
    input: './size-v5.js',
    output: {
      file: 'dist/v5-size.js',
      format: 'cjs',
    },
    plugins,
  },
  {
    input: './size-v7.js',
    output: {
      file: 'dist/v7-size.js',
      format: 'cjs',
    },
    plugins,
  },
];
