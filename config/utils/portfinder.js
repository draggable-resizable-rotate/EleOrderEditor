// eslint-disable-next-line import/no-extraneous-dependencies
const detect = require('detect-port');

module.exports = function getEffectivePort(expectPort) {
  return detect(parseInt(expectPort, 10));
};
