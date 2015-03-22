var files = require('../files');

var fls = {};
fls[files.dist] = [files.dist];

module.exports = {
  options: {
    singleQuotes: true
  },
  dist: {
    files: fls
  }
};
