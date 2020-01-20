module.exports = {
  resolve: {
    extensions: ['*', '.js'],
  },
  entry: {
    all: './example-all.js',
    v1: './example-v1.js',
    v4: './example-v4.js',
    bundlesize: './bundlesize.js',
  },
  output: {
    filename: '[name].js',
  },
  mode: 'production',
};
