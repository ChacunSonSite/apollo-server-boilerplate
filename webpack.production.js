const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = (env) => {
  const common = require('./webpack.common.js')(env);

  return merge(common, {
    devtool: 'source-map',
    entry: [path.join(__dirname, 'src')],
    externals: [nodeExternals({})],
    mode: 'production',
    plugins: [new CleanWebpackPlugin()],
  });
};
