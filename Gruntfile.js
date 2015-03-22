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
    function() {
      var tasks = [
        'karma:watch:start',
        'watch:andtestunit',
      ];
      grunt.task.run(tasks);
    }
  );

  grunt.registerTask('demo', 'Start the demo app', [
    'connect:demo',
    'parallel:watchdemo'
  ]);

  grunt.registerTask('coverage', 'Serve coverage report', ['connect:coverage']);

  grunt.registerTask(
    'test',
    'Execute all the tests',
    function() {
      var tasks = [
        'jshint',
        'shell:deleteCoverages',
        'karma:all',
      ];
      process.env.defaultBrowsers = 'Firefox,Chrome';
      grunt.task.run(tasks);
    }
  );

  grunt.registerTask(
    'build',
    'Build dist files',
    [
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
