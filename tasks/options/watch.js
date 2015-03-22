var grunt = require('grunt');
var files = require('../files');
var testfiles = files.source.concat(files.sourceStyle).concat([files.grunt]);
var unitTestfiles = grunt.util._.clone(testfiles).concat([files.unitTests]);
var demoFiles = files.source.concat(files.sourceStyle, files.demo);


module.exports = {
  andtestunit: {
    files: unitTestfiles,
    tasks: ['shell:deleteCoverages', 'karma:watch:run']
  },
  demo: {
    files: demoFiles,
    tasks: [],
    options: {
      livereload: true
    }
  }
};
