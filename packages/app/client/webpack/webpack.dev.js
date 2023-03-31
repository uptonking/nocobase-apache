// default webpack config for dev, build & test

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

function checkAppEnv(env) {
  return process.env.REACT_APP_ENV && process.env.REACT_APP_ENV.toLowerCase().indexOf(env) !== -1;
}

// 用在react项目打包阶段，会启用@babel/preset-react，而不会启用react-refresh/babel
const isEnvReactHot = checkAppEnv('reacthot');

const API_BASE_PATH = process.env.API_BASE_URL || '/api/';

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  // 解决热加载的问题 https://github.com/webpack/webpack-dev-server/issues/2758
  // target: process.env.NODE_ENV === 'production' ? 'browserslist' : 'web',
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_BASE_URL': JSON.stringify(API_BASE_PATH),
      'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
      'process.env.VERSION': JSON.stringify(packageJson.version),
    }),
    // new webpack.HotModuleReplacementPlugin(),
    // isEnvReactHot && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
});
