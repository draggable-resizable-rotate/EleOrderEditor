/* eslint-disable import/no-extraneous-dependencies */
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const isWsl = require('is-wsl');
const { DependEnvConfig } = require('../utils/env');
const PathConfig = require('../utils/path');

const { shouldUseSourceMap } = DependEnvConfig;
// eslint-disable-next-line no-unused-vars
module.exports = (env, args) => {
  const output = {
    path: PathConfig.appBuild,
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
  };

  const devtool = shouldUseSourceMap && 'source-map';

  const minimizer = [
    new TerserPlugin({
      terserOptions: {
        parse: {
          ecma: 8,
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2,
        },
        mangle: {
          safari10: true,
        },
        output: {
          ecma: 5,
          // 移除注释
          comments: false,
          ascii_only: true,
        },
      },
      extractComments: false,
      // 平台兼容，多进程打包
      parallel: !isWsl,
    }),
    // 默认使用 cssnano 压缩，默认会移除所有的注释
    new CssMinimizerPlugin(),
  ];

  return {
    bail: true,
    output,
    optimization: { // 开启压缩
      minimize: true,
      minimizer,
    },
    devtool,
    mode: 'production',
  };
};
