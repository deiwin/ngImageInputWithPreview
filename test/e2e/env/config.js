var browsers = process.env.PROTRACTOR_BROWSERS;
var reporter = process.env.PROTRACTOR_REPORTERS;
var capabilities = [];
(browsers || 'chrome').split(',').forEach(function(browser) {
  capabilities.push({browserName: browser.toLowerCase()});
});

/* Add coffeescript support */
require('coffee-script').register();

/* See tasks/options/protractor.js for config */
/* We still need to set some config thats not supported by grunt-protractor-runner */
exports.config = {
  multiCapabilities: capabilities,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 360000,
    silent: !!reporter
  },
  onPrepare: function() {
    switch(reporter) {
      case 'spec':
        var SpecReporter = require('jasmine-spec-reporter');
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
        break;
    }
  }
};
