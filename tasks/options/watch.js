var grunt = require('grunt');
var files = require('../files');
var testfiles = files.source.concat(files.sourceStyle).concat([files.allPartials, files.grunt]);
var unitTestfiles = grunt.util._.clone(testfiles).concat([files.unitTests]);
var e2eTestfiles = grunt.util._.clone(testfiles).concat([files.e2eTests]);
var bothTestfiles = grunt.util._.clone(unitTestfiles).concat([files.e2eTests]);
var demoFiles = files.source.concat(files.sourceStyle, files.allPartialsCombined, files.demo);


module.exports = {
  andtestunit: {
    files: unitTestfiles,
    tasks: ['shell:deleteCoverages', 'ngtemplates', 'karma:watch:run']
  },
  andteste2e: {
    files: e2eTestfiles,
    tasks: ['ngtemplates', 'protractor:tdd']
  },
  andtestboth: {
    files: bothTestfiles,
    tasks: ['shell:deleteCoverages', 'ngtemplates', 'karma:watch:run', 'protractor:tdd']
  },
  partials: {
    files: files.allPartials,
    tasks: ['ngtemplates'],
    options: {
      atBegin: true
    },
  },
  demo: {
    files: demoFiles,
    tasks: [],
    options: {
      livereload: true
    }
  }
};
