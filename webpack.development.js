const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  const common = require('./webpack.common.js')(env);
  return merge(common, {
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
    },
    entry: ['webpack/hot/poll?1000', path.join(__dirname, 'src/index.js')],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?1000', 'lodash-es', 'dotenv', 'graphql', 'graphql-scalars'],
      }),
    ],
    mode: 'development',
    plugins: [new webpack.HotModuleReplacementPlugin()],
    watch: true,
  });
}
