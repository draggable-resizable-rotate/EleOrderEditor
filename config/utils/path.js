// 获取根路径，并且导出输出路径，导出
const fs = require('fs');
const path = require('path');
const { DependEnvConfig } = require('./env');

// 获取当前项目的根路径
const appDirectory = fs.realpathSync(process.cwd());
// 获取相对项目的路径
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

// 获取 publicPath，默认是 '/'
function getPublicPath(string) {
  const packageJSON = require(`${string}`);
  // 默认返回相对路径
  let publicPath = DependEnvConfig.homepage || packageJSON?.homepage;

  if (publicPath) {
    publicPath = publicPath.endsWith('/')
      ? publicPath
      : `${publicPath}/`;

    return publicPath;
  }

  return '/';
}

module.exports = {
  appPath: resolveApp('.'),
  appBuild: resolveApp(DependEnvConfig.buildPath || 'build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  appWebpackCache: resolveApp('node_modules/.cache'),
  publicPath: getPublicPath(resolveApp('package.json')),
};
