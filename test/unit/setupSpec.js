describe('Setup', function() {
  'use strict';

  it('should be able to execute tests.', function() {
    expect(true).toBe(true);
  });

  it('should have angular defined.', function() {
    expect(angular).toBeDefined();
  });

  it('should have additional jasmine matchers', function() {
    expect(function() {}).toBeInstanceOf(Function);
  });

  it('should use jasmine 2.0 done callbacks', function(done) {
    expect(window.waitsFor).toBeUndefined();
    window.setTimeout(done, 10);
  });
});
