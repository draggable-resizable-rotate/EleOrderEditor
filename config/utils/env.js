/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const { resolve } = require('path');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const fsExist = require('./fs/fs-exist');

const { NODE_ENV } = process.env;
// 要求是node环境下运行该文件
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.',
  );
}

// 收集 - 当前环境下的环境配置文件路径
const appDirectory = fs.realpathSync(process.cwd());
const dotenvPath = resolve(appDirectory, 'config/env-config', '.env');
const dotenvFiles = [
  dotenvPath,
  `${dotenvPath}.${NODE_ENV}`,
  `${dotenvPath}.local`,
  `${dotenvPath}.${NODE_ENV}.local`,
].filter(Boolean);

// 收集 - 最终有效环境配置
const EnvConfig = {
  NODE_ENV: process.env.NODE_ENV,
  BABEL_ENV: process.env.BABEL_ENV,
};

// 加载 - 当前环境下的环境配置文件
dotenvFiles.forEach((dotenvFile) => {
  if (!fsExist(dotenvFile)) return;
  const config = dotenvExpand.expand(dotenv.config({
    path: dotenvFile,
  }));
  Object.assign(EnvConfig, config.parsed);
});

function getEnvironment(publicPath) {
  const RUNTIME = /^RUNTIME_/i;
  // 不希望遍历 process.env ，它有很多其它的附着遍历，遍历非常耗时
  const processEnv = Object.keys(EnvConfig)
    .filter((key) => RUNTIME.test(key))
    .reduce(
      (env, key) => {
        // eslint-disable-next-line no-param-reassign
        env[key] = EnvConfig[key];
        return env;
      },
      {
        NODE_ENV: EnvConfig.NODE_ENV,
        HOME_PAGE: publicPath,
      },
    );

  //  DefinePlugin
  const stringified = {
    'process.env': Object.keys(processEnv).reduce((env, key) => {
      // eslint-disable-next-line no-param-reassign
      env[key] = JSON.stringify(processEnv[key]);
      return env;
    }, {}),
  };

  return { env: processEnv, stringified };
}
function cvrStringToBoolean(booleanString, defaultValue) {
  if (booleanString === 'false') return false;
  if (booleanString === 'true') return true;
  return defaultValue;
}

module.exports = {
  getEnvironment,
  // 根据环境生成的webpack选择配置
  DependEnvConfig: {
    // 图片转换为 DataURL 的限制大小
    imageInlineSizeLimit: parseInt(
      EnvConfig.IMAGE_INLINE_SIZE_LIMIT || '10000',
      10,
    ),
    isEnvDevelopment: EnvConfig.NODE_ENV === 'development',
    isEnvProduction: EnvConfig.NODE_ENV === 'production',
    // 是否开启react文件热更新
    shouldUseReactRefresh: cvrStringToBoolean(EnvConfig.FAST_REFRESH, true),
    // 把转换JSX函数的代码一起打包，除非特殊需求请不要这么做
    hasJsxRuntime: (() => {
      if (EnvConfig.JSX_RUNTIME !== 'true') {
        return false;
      }
      try {
        require.resolve('react/jsx-runtime');
        return true;
      } catch (e) {
        return false;
      }
    })(),
    // 生产环境下 是否不开启  eslint 检测
    disableESLintPlugin: cvrStringToBoolean(EnvConfig.DISABLE_ESLINT_PLUGIN, true),
    // 生产环境下 是否开启 source-map
    shouldUseSourceMap: cvrStringToBoolean(EnvConfig.GENERATE_SOURCEMAP, true),
    homepage: EnvConfig.HOME_PAGE,
    buildPath: EnvConfig.BUILD_PATH,
    get port() {
      return EnvConfig.PORT;
    },
    set port(newPort) {
      EnvConfig.PORT = newPort;
    },
    host: EnvConfig.HOST,
    sockHost: EnvConfig.WDS_SOCKET_HOST,
    sockPath: EnvConfig.WDS_SOCKET_PATH,
    sockPort: EnvConfig.WDS_SOCKET_PORT,
    // 浏览器是否自动启动
    browserOpen: cvrStringToBoolean(EnvConfig.BROWSER_OPEN, true),
    sourceMapLoader: cvrStringToBoolean(EnvConfig.SOURCE_MAP_LOADER, true),
  },
};
