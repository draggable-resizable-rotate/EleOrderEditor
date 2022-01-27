const HtmlWebpackPlugin = require('html-webpack-plugin')
const { EnvConfig } = require('./utils/env')
const PathConfig = require('./utils/path')

const isEnvDevelopment = EnvConfig.NODE_ENV === 'development'
const isEnvProduction = EnvConfig.NODE_ENV === 'production'

module.exports = [
  new HtmlWebpackPlugin(Object.assign(
    {},
    {
      inject: true, // 插入到body中
      template: PathConfig.appHtml
    },
    isEnvProduction
      ? {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
        }
      : undefined
  ))
]
