module.exports = {
  resolve: {
    extensions: ['*', '.js'],
  },
  entry: {
    all: './example-all.js',
    v1: './example-v1.js',
    v4: './example-v4.js',

    'v1-size': './size-v1.js',
    'v3-size': './size-v3.js',
    'v4-size': './size-v4.js',
    'v5-size': './size-v5.js',
  },
  output: {
    filename: '[name].js',
  },
  mode: 'production',
};
