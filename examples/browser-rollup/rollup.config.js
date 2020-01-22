const resolve = require('rollup-plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');

const plugins = [resolve(), terser()];
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
    input: '../../dist/esm-browser/v1.js',
    output: {
      file: 'dist/v1_size.js',
      format: 'cjs',
    },
    plugins,
  },
  {
    input: '../../dist/esm-browser/v3.js',
    output: {
      file: 'dist/v3_size.js',
      format: 'cjs',
    },
    plugins,
  },
  {
    input: '../../dist/esm-browser/v4.js',
    output: {
      file: 'dist/v4_size.js',
      format: 'cjs',
    },
    plugins,
  },
  {
    input: '../../dist/esm-browser/v5.js',
    output: {
      file: 'dist/v5_size.js',
      format: 'cjs',
    },
    plugins,
  },
];
