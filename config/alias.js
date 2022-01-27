// const { EnvConfig } = require('./utils/env')
const PathConfig = require('./utils/path')

const { resolve } = require('path')

module.exports = {
  '@': resolve(PathConfig.appPath, 'src')
}
