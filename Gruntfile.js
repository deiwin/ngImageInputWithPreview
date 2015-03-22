/**
 * Build instructions for grunt.
 *
 * @param  {Object} grunt
 * @return {void}
 */
module.exports = function(grunt) {
  'use strict';

  var Helpers = require('./tasks/helpers');
  var config  = Helpers.config;
  var _       = grunt.util._;

  /* Task configuration is in ./tasks/options - load here */
  config = _.extend(config, Helpers.loadConfig('./tasks/options/'));

  /* Load grunt tasks from NPM packages */
  require('load-grunt-tasks')(grunt);
  grunt.loadTasks('tasks');


  grunt.registerTask(
    'tdd',
    'Watch source and test files and execute tests on change',
    function(suite) {
      var tasks = [];
      var watcher = '';
      if (!suite || suite === 'unit') {
        tasks.push('karma:watch:start');
        watcher = 'watch:andtestunit';
      }
      if (!suite || suite === 'e2e') {
        tasks.push('connect:test', 'protractor_webdriver');
        watcher = 'watch:andteste2e';
      }
      if (!suite) {
        watcher = 'watch:andtestboth';
      }
      tasks.push(watcher);
      grunt.task.run(tasks);
    }
  );

  grunt.registerTask('demo', 'Start the demo app', [
    'connect:demo',
    'shell:opendemo',
    'parallel:watchdemo'
  ]);

  grunt.registerTask('coverage', 'Serve coverage report', ['connect:coverage']);

  grunt.registerTask(
    'test',
    'Execute all the tests',
    function(suite) {
      var tasks = ['jshint', 'ngtemplates'];
      if (!suite || suite === 'unit') {
        process.env.defaultBrowsers = 'Firefox,Chrome';
        tasks.push('shell:deleteCoverages', 'karma:all');
      }
      if (!suite || suite === 'e2e') {
        tasks.push('connect:test', 'protractor:single');
      }
      grunt.task.run(tasks);
    }
  );

  grunt.registerTask(
    'build',
    'Build dist files',
    [
      'ngtemplates',
      'less:dist',
      'less:distmin',
      'concat:bannerToDistStyle',
      'concat:bannerToDistStyleMin',
      'concat:dist',
      'ngAnnotate:dist',
      'uglify'
    ]
  );

  grunt.registerTask('release', 'Test, bump, build and release.', function(type) {
    grunt.task.run([
      'test',
      'npm-contributors',
      'bump-only:' + (type || 'patch'),
      'build',
      'bump-commit'
    ]);
  });

  grunt.registerTask('default', 'Test', ['test']);

  grunt.initConfig(config);
};
