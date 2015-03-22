var optPort = require('grunt').option('port');
var path = require('path');
var base = process.cwd();

module.exports = {
  opendemo: {
    command: 'sleep 1; open http://localhost:' + (optPort || process.env.DEMO_PORT || 8000) + '/'
  },
  deleteCoverages: {
    command: [
      'rm -rf',
      path.join(base, '.tmp/coverage')
    ].join(' ')
  }
};
