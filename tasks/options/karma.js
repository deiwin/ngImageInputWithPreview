var files = require('../files');
var DEFAULT_BROWSERS = 'Chrome,Firefox,PhantomJS';
var browsers = process.env.KARMA_BROWSERS;
var reporters = process.env.KARMA_REPORTERS;

module.exports = {
  options: {
    browsers: (browsers || 'Chrome').split(','),
    preprocessors: {
      'src/**/*.+(js|coffee)': ['coverage'],
      '**/*.coffee': ['coffee']
    },
    frameworks: [
      'jasmine'
    ],
    coverageReporter: {
      reporters: [{
        type: 'lcov',
        dir: '.tmp/coverage',
        subdir: '.'
      }, {
        dir: '.tmp/coverage',
        type: 'text-summary'
      }]
    },
    reporters: (reporters || 'progress').split(',').concat('coverage'),
    singleRun: true,
  },
  all: {
    options: {
      browsers: (browsers || DEFAULT_BROWSERS).split(',')
    },
    files: {
      src: files.environments.karma.concat([files.unitTests])
    }
  },
  watch: {
    options: {
      background: true,
      singleRun: false,
      autoWatch: false
    }
  }
};
