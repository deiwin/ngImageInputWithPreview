var optPort = require('grunt').option('port');
var path = require('path');
var base = process.cwd();

module.exports = {
  deleteCoverages: {
    command: [
      'rm -rf',
      path.join(base, '.tmp/coverage')
    ].join(' ')
  }
};
