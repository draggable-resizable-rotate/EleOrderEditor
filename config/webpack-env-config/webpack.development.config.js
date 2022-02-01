/* eslint-disable import/no-extraneous-dependencies */
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const { resolve } = require('path');
const { DependEnvConfig } = require('../utils/env');
const PathConfig = require('../utils/path');
const proxy = require('../proxy');
const fsExist = require('../utils/fs/fs-exist');

const {
  port, host = '0.0.0.0',
  sockHost, sockPath, sockPort,
  browserOpen,
} = DependEnvConfig;

const MOCK_REGEXP = /\/mock\/[\s|\S]+/;

// eslint-disable-next-line no-unused-vars
module.exports = (env, args) => {
  const output = {
    path: PathConfig.appBuild,
    filename: 'static/js/[name].js',
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
    proxy,
    // 如果是History API那么没有找到文件需要退回带 index.html
    historyApiFallback: true,
    onBeforeSetupMiddleware(server) {
      // 虽然不能热更，但是刷新一下还是可以重新加载代码的
      // mock拦截
      server.app.use((request, response, next) => {
        const targetUrl = request.originalUrl;
        if (MOCK_REGEXP.test(targetUrl)) {
          const mockPath = resolve(PathConfig.appPath, `${targetUrl.slice(1)}.js`);
          if (!fsExist(mockPath)) {
            next();
            return;
          }
          const detailFun = require(`${mockPath}`);
          detailFun(request, response);
          delete require.cache[mockPath];
          return;
        }
        next();
      });
    },
    // onAfterSetupMiddleware (server) {
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
