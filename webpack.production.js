const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');

module.exports = (env) => {
  const common = require('./webpack.common.js')(env);

  return merge(common, {
    entry: [path.join(__dirname, 'src')],
    mode: 'production',
    externals: [nodeExternals({
      allowlist: ['lodash-es', 'dotenv', 'graphql', 'graphql-scalars'],
    })],
  });
};
