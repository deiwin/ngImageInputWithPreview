var helper = require('./SpecHelper');

describe('e2e setup', function() {
  it('should execute tests', function() {
    expect(true).toBe(true);
  });

  it('should use the helper', function() {
    expect(helper.help()).toBe('... I need somebody.');
    expect(helper.help(1)).toBe('not just anybody!');
  });

  it('should find our directive', function() {
    var headline = element(by.tagName('h1'));
    expect(headline.getText()).toBe('My Directive');
  });
});
