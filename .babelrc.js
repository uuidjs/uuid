module.exports = {
  presets: [],
  plugins: [],
  env: {
    commonjs: {
      presets: [['@babel/preset-env', { targets: { node: '8' }, modules: 'commonjs' }]],
    },
    esmBrowser: {
      presets: [['@babel/preset-env', { targets: { ie: '11' }, modules: false }]],
    },
    esmNode: {
      presets: [['@babel/preset-env', { targets: { node: '8' }, modules: false }]],
    },
  },
};
