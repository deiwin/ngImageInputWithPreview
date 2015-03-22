var files = require('../files');

module.exports = {
  files: files.source.concat([files.grunt, files.unitTests]),
  options: {
    ignores: ['**/*.coffee'],
    jshintrc: true
  }
};
