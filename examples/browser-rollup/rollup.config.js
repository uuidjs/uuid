const resolve = require('rollup-plugin-node-resolve');

const plugins = [
  resolve(),
];
module.exports = [{
  input: './example-all.js',
  output: {
    file: 'dist/all.js',
    format: 'iife'
  },
  plugins,
}, {
  input: './example-v1.js',
  output: {
    file: 'dist/v1.js',
    format: 'iife'
  },
  plugins,
}, {
  input: './example-v4.js',
  output: {
    file: 'dist/v4.js',
    format: 'iife'
  },
  plugins,
}];
