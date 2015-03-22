var files = require('../files');
var Helpers = require('../helpers');

module.exports = {
  options: {
    separator: '\n\n',
    stripBanners: true,
    banner: Helpers.getTemplate('banner') + Helpers.getTemplate('wrap-top'),
    footer: Helpers.getTemplate('wrap-bottom'),
    process: Helpers.cleanupModules
  },
  dist: {
    src: files.source,
    dest: files.dist
  },
  bannerToDistStyle: {
    src: [files.distStyle],
    dest: files.distStyle,
    options: {
      banner: Helpers.getTemplate('banner'),
      process: false,
      footer: ''
    }
  },
  bannerToDistStyleMin: {
    src: [files.distStyleMin],
    dest: files.distStyleMin,
    options: {
      banner: Helpers.getTemplate('banner-min'),
      process: false,
      footer: ''
    }
  }
};
