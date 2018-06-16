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

  unitTests: ['test/unit/SpecHelper.+(js|coffee)', 'test/unit/**/*Spec.+(js|coffee)'],

  environments: {},

  demo: 'demo/*',

  'package': ['package.json']
};

var baseEnvironment = [].concat(
  'node_modules/angular/angular.js',
  files.source
);

var demoEnvironment = _.clone(baseEnvironment);
var karmaEnvironment = _.clone(baseEnvironment);

karmaEnvironment.push('node_modules/angular-mocks/angular-mocks.js');


files.environments.demo = demoEnvironment;
files.environments.karma = karmaEnvironment;

if (typeof module === 'object') {
  module.exports = files;
}
