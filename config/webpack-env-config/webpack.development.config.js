/* eslint-disable import/no-extraneous-dependencies */
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const { DependEnvConfig } = require('../utils/env');
const PathConfig = require('../utils/path');

const {
  port, host = '0.0.0.0',
  sockHost, sockPath, sockPort,
  browserOpen
} = DependEnvConfig;

// eslint-disable-next-line no-unused-vars
module.exports = (env, args) => {
  const output = {
    path: PathConfig.appBuild,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
  };

  const devtool = 'cheap-module-source-map';

  const devServer = {
    host,
    open: browserOpen,
    compress: true,
    static: {
      directory: PathConfig.appPublic,
      publicPath: [PathConfig.publicPath],
      watch: {
        ignored: ignoredFiles(PathConfig.appSrc),
      },
    },
    port,
    client: {
      webSocketURL: {
        hostname: sockHost,
        pathname: sockPath,
        port: sockPort,
      },
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    // 把打包的所有资源，也移到 内存服务的 publicPath处
    devMiddleware: {
      publicPath: PathConfig.publicPath.slice(0, -1),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    // onBeforeSetupMiddleware (devServer) {
    //   // 在内置中间件执行之前做些什么
    // },
    // onAfterSetupMiddleware (devServer) {
    //   // 在内置中间件执行之后做些什么
    // }
  };

  return {
    bail: false,
    output,
    devtool,
    mode: 'development',
    devServer,
  };
};
