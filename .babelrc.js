module.exports = {
  presets: [],
  plugins: [],
  env: {
    commonjs: {
      plugins: ['babel-plugin-add-module-exports'],
      presets: [['@babel/preset-env', { targets: { node: '8' }, modules: 'commonjs' }]],
    },
    esmBrowser: {
      presets: [['@babel/preset-env', { modules: false }]],
    },
    esmNode: {
      presets: [['@babel/preset-env', { targets: { node: '8' }, modules: false }]],
    },
  },
};
