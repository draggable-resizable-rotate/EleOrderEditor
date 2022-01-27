const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const isWsl = require('is-wsl')
const { EnvConfig } = require('./../utils/env')
const PathConfig = require('./../utils/path')

const isEnvProduction = EnvConfig.NODE_ENV === 'production'
const isEnvDevelopment = EnvConfig.NODE_ENV === 'development'

module.exports = (env, args) => {
  const output = {
    path: PathConfig.appBuild,
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js'
  }

  const shouldUseSourceMap = EnvConfig.GENERATE_SOURCEMAP === 'true'
  const devtool = shouldUseSourceMap && 'source-map'

  const minimizer = [
    new TerserPlugin({
      terserOptions: {
        parse: {
          ecma: 8
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2
        },
        mangle: {
          safari10: true
        },
        output: {
          ecma: 5,
          // 移除注释
          comments: false,
          ascii_only: true
        }
      },
      extractComments: false,
      // 平台兼容，多进程打包
      parallel: !isWsl
    }),
    // 默认使用 cssnano 压缩，默认会移除所有的注释
    new CssMinimizerPlugin()
  ]

  const plugins = [
    isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
        })
  ].filter(Boolean)

  return {
    bail: true,
    output,
    optimization: { // 开启压缩
      minimize: true,
      minimizer
    },
    devtool,
    plugins,
    mode: 'production'
  }
}
