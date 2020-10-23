const path = require('path');
const { argv } = require('yargs');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => {
  console.log('analize: ', env.a); // 'local'
  const plugins = []
  if (env.a) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        defaultSizes: 'gzip',
        generateStatsFile: true,
        openAnalyzer: true,
        reportFilename: path.resolve(`../build-analysis/index.html`),
        statsFilename: path.resolve(`../build-analysis/results.json`),
      })
    );
  }

  return {
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist'),
    },
    target: 'node',
    plugins
  }
};
