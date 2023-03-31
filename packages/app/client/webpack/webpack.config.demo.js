const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devServerConfig = require('./webpack.server');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = merge(devServerConfig, {
  entry: path.resolve(__dirname, '../src/app.tsx'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../build'),
  },
  plugins: [
    new NodePolyfillPlugin({
      excludeAliases: ['console'],
    }),
    new HtmlWebpackPlugin({
      // template: path.resolve(process.cwd(), 'demo.html'),
      template: './webpack/index.html',
      // filename: 'index.html',
    }),
  ],
  // devServer: {
  //   contentBase: path.resolve(__dirname, '../build'),
  // },
});
