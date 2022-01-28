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

// 收集最终有效环境配置
const allEnvConfig = {
  NODE_ENV: process.env.NODE_ENV || 'development',
};

// 加载 - 当前环境下的环境配置文件
dotenvFiles.forEach((dotenvFile) => {
  if (!fsExist(dotenvFile)) return;
  const config = dotenv.config({
    path: dotenvFile,
  });
  Object.assign(allEnvConfig, config.parsed);
  dotenvExpand.expand(config);
});

function getEnvironment(publicPath) {
  const RUNTIME = /^RUNTIME_/i;
  const processEnv = Object.keys(process.env)
    .filter((key) => RUNTIME.test(key))
    .reduce(
      (env, key) => {
        // eslint-disable-next-line no-param-reassign
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV || 'development',
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

module.exports = {
  getEnvironment,
  EnvConfig: allEnvConfig,
  // 根据环境生成的webpack选择配置
  DependEnvConfig: {
    // 图片转换为 DataURL 的限制大小
    imageInlineSizeLimit: parseInt(
      allEnvConfig.IMAGE_INLINE_SIZE_LIMIT || '10000',
      10,
    ),
    isEnvDevelopment: allEnvConfig.NODE_ENV === 'development',
    isEnvProduction: allEnvConfig.NODE_ENV === 'production',
    // 是否开启react文件热更新
    shouldUseReactRefresh: allEnvConfig.FAST_REFRESH,
    // 把转换JSX函数的代码一起打包，除非特殊需求请不要这么做
    hasJsxRuntime: (() => {
      if (allEnvConfig.DISABLE_NEW_JSX_TRANSFORM === 'true') {
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
    disableESLintPlugin: allEnvConfig.DISABLE_ESLINT_PLUGIN === 'true',
    // 生产环境下 是否开启 source-map
    shouldUseSourceMap: allEnvConfig.GENERATE_SOURCEMAP === 'true',
  },
};
