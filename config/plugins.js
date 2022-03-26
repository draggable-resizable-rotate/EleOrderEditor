/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// react 热更新
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const { getEnvironment, DependEnvConfig } = require('./utils/env');
const PathConfig = require('./utils/path');
const moduleFileExtensions = require('./extensions');
const Provider = require('./provider');

const SrcEffectiveEnv = getEnvironment(PathConfig.publicPath);
const { ProvidePlugin } = webpack;

const {
  hasJsxRuntime,
  shouldUseReactRefresh,
  isEnvProduction,
  isEnvDevelopment,
  disableESLintPlugin,
} = DependEnvConfig;

const plugins = [
  new HtmlWebpackPlugin({
    title: 'React CLI',
    inject: true, // 插入到body中
    template: PathConfig.appHtml,
    ...(isEnvProduction
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
          minifyURLs: true,
        },
      }
      : undefined),
  }),
  isEnvProduction
  && new MiniCssExtractPlugin({
    filename: 'static/css/[name].[contenthash:8].css',
    chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
  }),
  // 热更新插件
  isEnvDevelopment
  && shouldUseReactRefresh
  && new ReactRefreshWebpackPlugin({
    overlay: false,
  }),
  new ModuleNotFoundPlugin(PathConfig.appPath),
  // 向 html-webpack-plugin 插件 的 templateParameters 注入属性·
  new InterpolateHtmlPlugin(HtmlWebpackPlugin, SrcEffectiveEnv.env),
  // 为源代码注册 process.env 变量
  new webpack.DefinePlugin(SrcEffectiveEnv.stringified),
  new webpack.IgnorePlugin({
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/,
  }),
  new WebpackManifestPlugin({
    fileName: 'asset-manifest.json',
    publicPath: PathConfig.publicPath,
    generate: (seed, files, entrypoints) => {
      const manifestFiles = files.reduce((manifest, file) => {
        // eslint-disable-next-line no-param-reassign
        manifest[file.name] = file.path;
        return manifest;
      }, seed);
      // 注意这里的 entrypoints 的属性访问
      const entrypointFiles = entrypoints.index.filter(
        (fileName) => !fileName.endsWith('.map'),
      );

      return {
        files: manifestFiles,
        entrypoints: entrypointFiles,
      };
    },
  }),
  // 生产环境下，决定是否开启eslint检测
  isEnvProduction && !disableESLintPlugin
        && new ESLintPlugin({
          extensions: moduleFileExtensions,
          formatter: require.resolve('react-dev-utils/eslintFormatter'),
          eslintPath: require.resolve('eslint'),
          failOnError: isEnvProduction,
          context: PathConfig.appSrc,
          cache: true,
          cacheLocation: path.resolve(
            PathConfig.appNodeModules,
            '.cache/.eslintcache',
          ),
          cwd: PathConfig.appPath,
          resolvePluginsRelativeTo: __dirname,
          // 注意，这个配置能和外部的 eslintrc 文件 以及 package.json 的 eslintConfig 合并
          baseConfig: {
            extends: [require.resolve('eslint-config-react-app/base'), 'react-app'],
            rules: {
              // 每个有jsx语法的js文件必须引入 import React from 'react'
              ...(!hasJsxRuntime && {
                'react/react-in-jsx-scope': 'error',
              }),
            },
          },
        }),
  // 生产环境下复制 public 到 打包目录下
  isEnvProduction && new CopyPlugin({
    patterns: [
      {
        from: '**/*',
        globOptions: {
          dot: true,
          // 如果被 gitignore 配置过忽略的文件不移动
          gitignore: true,
          ignore: ['**/index.html'],
        },
        to: PathConfig.appBuild,
        context: PathConfig.appPublic,
      },
    ],
  }),
  // 进度条，替代方案 progress-bar-webpack-plugin
  new WebpackBar(),
  new ProvidePlugin(Provider),
].filter(Boolean);

module.exports = plugins;
