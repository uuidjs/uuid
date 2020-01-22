module.exports = {
  resolve: {
    extensions: ['*', '.js'],
  },
  entry: {
    all: './example-all.js',
    v1: './example-v1.js',
    v4: './example-v4.js',

    v1_size: '../../dist/esm-browser/v1.js',
    v3_size: '../../dist/esm-browser/v3.js',
    v4_size: '../../dist/esm-browser/v4.js',
    v5_size: '../../dist/esm-browser/v5.js',
  },
  output: {
    filename: '[name].js',
  },
  mode: 'production',
};
