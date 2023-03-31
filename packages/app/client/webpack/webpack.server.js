// webpack config for dev demo using webpack-dev-server

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const devConfig = require('./webpack.dev');

const API_BASE_PATH = process.env.API_BASE_PATH || '/api/';
const PROXY_TARGET_URL = process.env.PROXY_TARGET_URL || `http://127.0.0.1:13001`;

console.log(';; env ', process.env.API_BASE_URL, process.env.API_BASE_PATH);
module.exports = merge(devConfig, {
  devServer: {
    // 若要使用热加载，还需要在cli上传入 --hot
    // contentBase: path.resolve(__dirname, '../build'),
    // open: true,
    host: '0.0.0.0',
    port: 13000,
    hot: true,
    compress: true,
    historyApiFallback: true,
    // inline: true,
    client: {
      progress: true,
      logging: 'verbose',
    },
    proxy: {
      [API_BASE_PATH]: {
        target: PROXY_TARGET_URL,
        changeOrigin: true,
        pathRewrite: { [`^${API_BASE_PATH}`]: API_BASE_PATH },
      },
    },
  },
});
