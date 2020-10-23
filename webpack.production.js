const path = require('path');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

module.exports = (env) => {
  const common = require('./webpack.common.js')(env);

  return merge(common, {
    devtool: 'source-map',
    entry: [path.join(__dirname, 'src')],
    externals: [nodeExternals({})],
    mode: 'production',
  });
};
