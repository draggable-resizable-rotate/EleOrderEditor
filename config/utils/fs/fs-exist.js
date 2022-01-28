const { accessSync, constants } = require('fs');

module.exports = function fsExist(file) {
  try {
    accessSync(file, constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
};
