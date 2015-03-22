var _ = require('grunt').util._;
var files = {
  grunt: 'Gruntfile.js',

  source: [
    'src/js/helper.module.js',
    'src/js/!(helper.module)*.js'
  ],
  sourceStyle: [
    'src/less/style.less'
  ],

  distStyle: 'dist/<%= pkg.name %>.css',
  distStyleMin: 'dist/<%= pkg.name %>.min.css',
  dist: 'dist/<%= pkg.name %>.js',
  distMin: 'dist/<%= pkg.name %>.min.js',
  dists: 'dist/*',

  partialsDir: 'src/partials',
  allHTML: '*.html',
  allPartials: 'src/partials/*.html',
  allPartialsCombined: '.tmp/all-partials.js',

  unitTests: ['test/unit/SpecHelper.+(js|coffee)', 'test/unit/**/*Spec.+(js|coffee)'],
  e2eTests: ['test/e2e/SpecHelper.+(js|coffee)', 'test/e2e/*Spec.+(js|coffee)'],

  environments: {},

  demo: 'demo/*',

  'package': ['package.json', 'bower.json']
};

var baseEnvironment = [].concat(
  'bower_components/angular/angular.js',
  files.source,
  files.allPartialsCombined
);

var demoEnvironment = _.clone(baseEnvironment);
var karmaEnvironment = _.clone(baseEnvironment);

karmaEnvironment.unshift('bower_components/jasmine-moar-matchers/lib/*.js');
karmaEnvironment.push('bower_components/angular-mocks/angular-mocks.js');


files.environments.demo = demoEnvironment;
files.environments.karma = karmaEnvironment;

if (typeof module === 'object') {
  module.exports = files;
}
