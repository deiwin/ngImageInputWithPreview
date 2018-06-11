module.exports = {
  contributors: {
    options: {
      commit: false,
      filter: function(contributors) {
        return contributors.filter(function(contributor) {
          return contributor.commitCount < 3;
        });
      }
    }
  },
  maintainers: {
    options: {
      filter: function(contributors) {
        return contributors.filter(function(contributor) {
          return contributor.commitCount >= 3;
        });
      },
      as: 'maintainers'
    }
  }
};
