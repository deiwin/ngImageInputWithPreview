var files = require('../files');

module.exports = {
  options: {
    files: files.package,
    updateConfigs: ['pkg'],
    commitFiles: files.package.concat([files.dists]),
    pushTo: 'origin'
  }
};
