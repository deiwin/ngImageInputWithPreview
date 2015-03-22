var files = require('../files');
var Helpers = require('../helpers');

var fls = {};
fls[files.distMin] = [files.dist];

module.exports = {
  options: {
    banner: Helpers.getTemplate('banner-min')
  },
  dist: {
    files: fls
  }
};
