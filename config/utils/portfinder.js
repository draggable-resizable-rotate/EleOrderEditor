const portfinder = require('portfinder')

portfinder.highestPort = 65535

module.exports = function getEffectivePort (port) {
  // default: 8000
  portfinder.basePort = parseInt(port)
  return new Promise((resolve, reject) => {
    // 查找端口号
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
        return
      }
      resolve(port)
    })
  })
}
