var grunt = require('grunt');
var files = require('../files');
var glob = require('glob');
var _ = grunt.util._;
var isDebug = !!grunt.option('debug');

var jar = glob.sync('node_modules/protractor/selenium/selenium-server-standalone-2.*.jar')[0];
var chromeDriver = process.cwd() + '/node_modules/protractor/selenium/chromedriver';

var options = {
  debug: isDebug,
  configFile: 'test/e2e/env/config.js',
  args: {}
};


var args = {
  specs: [files.e2eTests],
  framework: 'jasmine',
  allScriptsTimeout: 120000
};

function extendOptions(addArgs) {
  return _.extend({}, options, {args: _.extend({}, args, addArgs)});
}

module.exports = {
  single: {
    options: extendOptions({
      chromeDriver: chromeDriver,
      seleniumServerJar: jar
    })
  },
  tdd: {
    options: extendOptions({
      chromeDriver: chromeDriver,
      seleniumAddress: 'http://localhost:4444/wd/hub'
    })
  }
};
