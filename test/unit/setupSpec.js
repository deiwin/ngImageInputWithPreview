/* global initGlobals, createDirective, $timeout, $q */
describe('Setup', function() {
  'use strict';

  it('should be able to execute tests.', function() {
    expect(true).toBe(true);
  });

  it('should have angular defined.', function() {
    expect(angular).toBeDefined();
  });

  it('should be able to find the angular module', function() {
    initGlobals();
    expect(angular.module('myModule')).toBeDefined();
  });

  it('should be able to create a directive', function() {
    initGlobals();

    var directive = createDirective();
    expect(directive.scope.foo).toBe('bar');
  });

  it('should have additional jasmine matchers', function() {
    expect(function() {}).toBeInstanceOf(Function);
  });

  it('should use jasmine 2.0 done callbacks', function(done) {
    expect(window.waitsFor).toBeUndefined();
    window.setTimeout(done, 10);
  });

  it('should clean-up globals (sanity)', function() {
    initGlobals();
    expect($q).toBeDefined();
  });

  it('should clean-up globals', function() {
    expect(window.$q).toBeUndefined();
  });

  it('should be able to initialize additional globals (sanity)', function() {
    initGlobals();
    expect(window.$timeout).toBeUndefined();
  });

  it('should be able to initialize additional globals', function() {
    initGlobals(['$timeout']);
    expect($timeout).toBeDefined();
  });

  it('should throw if we try to initiate a directive without having globals', function() {
    expect(createDirective).toThrow();
  });

  var previousTimeout = window.$timeout;
  it('should keep the global namespace intact part 1', function() {
    window.$timeout = 'fooBar';
    initGlobals(['$timeout']);
  });

  it('should keep the global namespace intact part 2', function() {
    expect(window.$timeout).toBe('fooBar');
    window.$timeout = previousTimeout;
  });
});
