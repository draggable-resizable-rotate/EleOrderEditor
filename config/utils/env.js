const fsExist = require('./fs/fs-exist')
const fs = require('fs')
const { resolve } = require('path')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')

const NODE_ENV = process.env.NODE_ENV
// 要求是node环境下运行该文件
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  )
}

const appDirectory = fs.realpathSync(process.cwd())
const dotenvPath = resolve(appDirectory, 'config/env-config', '.env')
const dotenvFiles = [
  dotenvPath,
  `${dotenvPath}.${NODE_ENV}`,
  `${dotenvPath}.local`,
  `${dotenvPath}.${NODE_ENV}.local`
].filter(Boolean)

// 收集最终有效环境配置
const allEnvConfig = {
  NODE_ENV: process.env.NODE_ENV || 'development'
}

dotenvFiles.forEach(dotenvFile => {
  if (!fsExist(dotenvFile)) return
  const config = dotenv.config({
    path: dotenvFile
  })
  Object.assign(allEnvConfig, config.parsed)
  dotenvExpand.expand(config)
})

const RUNTIME = /^RUNTIME_/i

function getEnvironment (publicPath) {
  const processEnv = Object.keys(process.env)
    .filter(key => RUNTIME.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key]
        return env
      },
      {
        NODE_ENV: process.env.NODE_ENV || 'development',
        HOME_PAGE: publicPath
      }
    )

  //  DefinePlugin
  const stringified = {
    'process.env': Object.keys(processEnv).reduce((env, key) => {
      env[key] = JSON.stringify(processEnv[key])
      return env
    }, {})
  }

  return { env: processEnv, stringified }
}

module.exports = {
  getEnvironment,
  EnvConfig: allEnvConfig
}
