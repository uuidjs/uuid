module.exports = {
  resolve: {
    extensions: ['*', '.js'],
  },
  entry: {
    all: './example-all.js',
    v1: './example-v1.js',
    v4: './example-v4.js',

    'v1-size': './bundlesize-v1.js',
    'v3-size': './bundlesize-v3.js',
    'v4-size': './bundlesize-v4.js',
    'v5-size': './bundlesize-v5.js',
  },
  output: {
    filename: '[name].js',
  },
  mode: 'production',
};
