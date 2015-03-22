module.exports = {
  bower: {
    options: {
      file: 'bower.json',
      commitMessage: 'update bower authors',
      filter: false,
      as: 'authors'
    }
  },
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
