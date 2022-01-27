const createEnvironmentHash = require('./../utils/persistentCache/createEnvironmentHash')
const moduleFileExtensions = require('./../utils/extensions')
const fsExist = require('./../utils/fs/fs-exist')
const Alias = require('./../alias')
const WebpackModule = require('./../module')
const { EnvConfig } = require('./../utils/env')
const PathConfig = require('./../utils/path')
const WebpackPlugins = require('./../plugins')

module.exports = (env, args) => {
  const entry = {
    index: {
      import: PathConfig.appIndexJs
    }
  }

  const output = {
    publicPath: PathConfig.publicPath,
    // 默认的asset 资源输出类型
    assetModuleFilename: 'static/media/[name].[hash][ext]'
  }

  const devtool = 'source-map'

  // 全局缓存自动控制
  const cache = {
    type: 'filesystem',
    version: createEnvironmentHash(EnvConfig),
    cacheDirectory: PathConfig.appWebpackCache,
    store: 'pack',
    buildDependencies: {
      defaultWebpack: ['webpack/lib/'],
      // 本文件所有的依赖文件都能被缓存
      config: [__filename],
      // 同 config
      tsconfig: [PathConfig.appTsConfig, PathConfig.appJsConfig].filter(file => fsExist(file))
    }
  }

  // 是否需要用 TS
  const useTypeScript = fsExist(PathConfig.appTsConfig)

  const resolve = {
    modules: ['node_modules', PathConfig.appNodeModules],
    extensions: moduleFileExtensions
      .map(ext => `.${ext}`)
      .filter(ext => useTypeScript || !ext.includes('ts')),
    alias: {
      'react-native': 'react-native-web',
      ...Alias
    }
  }

  return {
    // 开启browserslist 之后需要在 package.json 也开启
    target: ['browserslist'],
    entry,
    output,
    devtool,
    cache,
    // create-react-app 把这个关了，换了自己的内置的插件显示内容
    // infrastructureLogging: { // 主要显示webpack的各种交互日志，包括运行时的打印信息，浏览器的打印日志
    //   level: 'none'
    // },
    resolve,
    module: WebpackModule,
    plugins: WebpackPlugins
  }
}
