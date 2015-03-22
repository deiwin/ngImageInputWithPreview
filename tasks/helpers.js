/* global process */
var grunt = require('grunt');
var lf = grunt.util.linefeed;
var fs = require('fs');
var path = require('path');
var Helpers = {};
var base = process.cwd();
var glob = require('glob');

/* Overwrite browser env variables if grunt options are set */
var browsers = grunt.option('browser') || grunt.option('browsers');
if (browsers) {
  process.env.KARMA_BROWSERS = browsers;
  process.env.PROTRACTOR_BROWSERS = browsers;
}

var reporters = grunt.option('reporter') || grunt.option('reporters');
if (reporters) {
  process.env.KARMA_REPORTERS = reporters;
  process.env.PROTRACTOR_REPORTERS = reporters;
}

Helpers.config = {
  pkg: grunt.file.readJSON('./package.json'),
  env: process.env
};

Helpers.loadConfig = function(path) {
  var glob = require('glob');
  var object = {};
  var key = null;

  glob.sync('*', { cwd: path }).forEach(function(option) {
    key = option.replace(/\.js$/, '');
    object[key] = require('../' + path + option);
  });

  return object;
};

Helpers.cleanupModules = function(src, filepath) {
  /* Normalize line-feeds */
  src = grunt.util.normalizelf(src);

  /* Remove jshint comments */
  src = src.replace(/[\s]*\/\* (jshint|global).*\n/g, '');

  /* Trim */
  src = src.replace(/^\s+|\s+$/g, '');

  /* Indent */
  src = src.split(lf).map(function(line) {
    return '  ' + line;
  }).join(lf);

  return '  // ' + filepath + lf + src;
};

Helpers.getTemplate = function(name) {
  return fs.readFileSync('./tasks/templates/' + name + '.tpl', 'utf8');
};

function getScripts(env) {
  var scripts = '';
  var tag = '<script type="text/javascript" src=":src"></script>\n';
  require('./files').environments[env].forEach(function(fileGlobs) {
    glob.sync(fileGlobs).forEach(function(file) {
      scripts += tag.replace(':src', '/' + file);
    });
  });

  return scripts;
}

function getStyles() {
  var styles = '';
  var tag = '<link rel="stylesheet" type="text/css" href=":href" />\n';
  require('./files').sourceStyle.forEach(function(file) {
    styles += tag.replace(':href', '/' + file.replace('.less', '.css'));
  });

  return styles;
}

Helpers.getIndex = function(dir, env, callback) {
  fs.readFile(path.join(base, dir, 'index.html'), function(err, index) {
    callback(index.toString()
      .replace('<!-- [[src/js]] -->', getScripts(env))
      .replace('<!-- [[src/less]] -->', getStyles())
    );
  });
};

module.exports = Helpers;
