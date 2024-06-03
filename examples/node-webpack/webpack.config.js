module.exports = {
  resolve: {
    extensions: ['*', '.js'],
  },
  entry: {
    all: './example-all.js',
    v1: './example-v1.js',
    v4: './example-v4.js',
    v7: './example-v7.js',
  },
  output: {
    filename: '[name].js',
  },
  mode: 'production',
  target: 'node',
};
