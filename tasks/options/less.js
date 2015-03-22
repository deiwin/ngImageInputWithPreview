var files = require('../files');

var f = {};
var fm = {};
f[files.distStyle] = files.sourceStyle;
fm[files.distStyleMin] = files.sourceStyle;

module.exports = {
  dist: {
    files: f
  },
  distmin: {
    options: {
      cleancss: true
    },
    files: fm
  }
};