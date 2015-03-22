var optPort = require('grunt').option('port');
var helpers = require('../helpers');
var connectLess = require('connect-less');
var mkdirp = require('mkdirp');
var path = require('path');
var base = process.cwd();

var baseDirs = ['.', '.tmp'];

mkdirp(path.join(base, '.tmp/demo'));
mkdirp(path.join(base, '.tmp/src/less'));

function middleware(dir, env) {
  return function(connect, options, middlewares) {
    /* Prepare index.html */
    middlewares.unshift(function addJs(req, res, next) {
      if (req.method === 'GET' && req.url === '/') {
        helpers.getIndex(dir, env, function(index) {
          res.end(index);
        });
        return;
      }
      next();
    });

    /* Handle style requests */
    middlewares.unshift(connectLess({
      dst: path.join(base, '.tmp')
    }));

    return middlewares;
  };
}

module.exports = {
  options: {
    hostname: '*'
  },
  demo: {
    options: {
      port: optPort || process.env.DEMO_PORT || 8000,
      middleware: middleware('demo', 'demo'),
      base: baseDirs.concat('demo'),
      livereload: true
    }
  },
  coverage: {
    options: {
      port: optPort || process.env.COVERAGE_PORT || 7000,
      base: path.join(base, '.tmp/coverage/lcov-report'),
      keepalive: true,
      open: true
    }
  }
};
