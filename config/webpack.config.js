const fsExist = require('./utils/fs/fs-exist')
const { resolve } = require('path')
const { merge } = require('webpack-merge')
const getEffectivePort = require('./utils/portfinder')

const innerEnvironment = [
  'development',
  'production'
]

// 传入异步的 PromiseCOnfig
module.exports = async (env, args) => {
  const environment = env?.mode || 'development'
  const realPath = getWebpackConfigPath(environment)
  // 不存在配置退出
  if (!fsExist(realPath)) return
  // 开始注册环境
  process.env.NODE_ENV = environment
  // 加载环境变量文件配置
  const { EnvConfig } = require('./utils/env')
  // 获取有效端口
  const effectivePort = await getEffectivePort(EnvConfig.PORT || '3000')
  process.env.PORT = effectivePort
  EnvConfig.PORT = effectivePort
  // 生成路径配置
  require('./utils/path')
  // 用到的时候才加载 config，能省一点性能
  let webpackConfig
  webpackConfig = getConfig(require(`${realPath}`), env, args)

  if (innerEnvironment.includes(environment)) { // 指定的环境需要合并 common
    webpackConfig = merge(
      getConfig(
        require(`${getWebpackConfigPath('common')}`),
        env,
        args
      ),
      webpackConfig
    )
  }

  return webpackConfig
}

function getConfig (config, ...args) {
  return typeof config === 'function'
    ? config?.(...args)
    : config
}

function getWebpackConfigPath (environment) {
  return resolve(__dirname, `./webpack-env-config/webpack.${environment}.config.js`)
}
