/* global compile*/
describe('ngImageInputWithPreview', function() {
  'use strict';
  beforeEach(function() {
    module('ngImageInputWithPreview', function($provide) {
      // mock the fileReader service
      $provide.provider('fileReader', {
        $get: function() {
          return {};
        }
      });
    });
  });

  var waitWhileThenRun = function(shouldContinue, f) {
    // I'm sorry, but I don't know a better way to see if the validators have
    // finished with a failure
    var interval = setInterval(function() {
      if (shouldContinue()) {
        return;
      }
      clearInterval(interval);
      f();
    }, 50);
  };

  var testSelectUnselectWorks = function(type, context) {
    var result, file, ngModel, element, $parentScope;
    beforeEach(inject(function($q, fileReader) {
      var deferred = $q.defer();
      element = context.element;
      $parentScope = context.$parentScope;
      // a single pixel image
      result = 'data:image/gif;base64,R0lGODlhAQABAPAAAP8REf///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
      deferred.resolve(result);
      fileReader.readAsDataUrl = jasmine.createSpy().and.returnValue(deferred.promise);

      file = new Blob([result], {
        type: type,
      });
      file.lastModifiedDate = '';
      file.name = 'filename';

      element.prop('files', [file]);
      ngModel = element.data('$ngModelController');
    }));

    it('should set the data url the result', function(done) {
      ngModel.$viewChangeListeners.push(function() {
        expect($parentScope.image.src).toEqual(result);
        done();
      });
      element.triggerHandler('change');
    });

    describe('and then unselected', function() {
      beforeEach(function() {
        element.prop('files', [undefined]);
        element.triggerHandler('change');
      });

      it('should set the data url to an empty string', function() {
        expect($parentScope.image).toBeUndefined();
        element.triggerHandler('change');
      });
    });
  };

  var testTextFile = function(context) {
    var file, ngModel, element, $parentScope;
    beforeEach(function() {
      element = context.element;
      $parentScope = context.$parentScope;
      file = new Blob([''], {
        type: 'text/plain',
      });
      file.lastModifiedDate = '';
      file.name = 'filename';
      element.prop('files', [file]);
      element.triggerHandler('change');
      ngModel = element.data('$ngModelController');
    });

    it('should not set the data url', function() {
      expect($parentScope.image).toBeUndefined();
    });

    it('should have an error', function() {
      expect(ngModel.$error.image).toBe(true);
    });

    describe('and then unselected', function() {
      beforeEach(function() {
        element.prop('files', [undefined]);
        element.triggerHandler('change');
      });

      it('should not set the data url', function() {
        expect($parentScope.image).toBeUndefined();
      });

      it('should not have an error', function() {
        expect(ngModel.$error.image).toBeFalsy();
      });
    });
  };

  var testPNGFile = function(context) {
    testSelectUnselectWorks('image/png', context);
  };

  var testDimensionsCheckFails = function(context) {
    var file, ngModel, element, $parentScope;
    beforeEach(inject(function($q, fileReader) {
      var deferred = $q.defer();
      element = context.element;
      $parentScope = context.$parentScope;
      // a single pixel image
      var result = 'data:image/gif;base64,R0lGODlhAQABAPAAAP8REf///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
      deferred.resolve(result);
      fileReader.readAsDataUrl = jasmine.createSpy().and.returnValue(deferred.promise);
      file = new Blob([result], {
        type: 'image/png',
      });
      file.lastModifiedDate = '';
      file.name = 'filename';
      element.prop('files', [file]);
      element.triggerHandler('change');
      ngModel = element.data('$ngModelController');
    }));

    it('should not set the data url', function(done) {
      waitWhileThenRun(function() {
        return ngModel.$pending && Object.keys(ngModel.$pending).length > 0;
      }, function() {
        expect($parentScope.image).toBeUndefined();
        done();
      });
    });

    it('should have an error', function(done) {
      waitWhileThenRun(function() {
        return ngModel.$pending && Object.keys(ngModel.$pending).length > 0;
      }, function() {
        expect(ngModel.$error.dimensions).toBe(true);
        done();
      });
    });

    describe('and then unselected', function() {
      beforeEach(function() {
        element.prop('files', [undefined]);
        element.triggerHandler('change');
      });

      it('should not set the data url', function() {
        expect($parentScope.image).toBeUndefined();
      });

      it('should not have an error', function() {
        expect(ngModel.$error.image).toBeFalsy();
      });
    });
  };

  var testSizeCheckFails = function(context) {
    var file, ngModel, element, $parentScope;
    beforeEach(inject(function($q, fileReader) {
      var deferred = $q.defer();
      element = context.element;
      $parentScope = context.$parentScope;
      // a single pixel image
      var result = 'data:image/gif;base64,R0lGODlhAQABAPAAAP8REf///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
      deferred.resolve(result);
      fileReader.readAsDataUrl = jasmine.createSpy().and.returnValue(deferred.promise);
      file = new Blob([result], {
        type: 'image/png',
      });
      file.lastModifiedDate = '';
      file.name = 'filename';
      element.prop('files', [file]);
      element.triggerHandler('change');
      ngModel = element.data('$ngModelController');
    }));

    it('should not set the data url', function(done) {
      waitWhileThenRun(function() {
        return ngModel.$pending && Object.keys(ngModel.$pending).length > 0;
      }, function() {
        expect($parentScope.image).toBeUndefined();
        done();
      });
    });

    it('should have an error', function(done) {
      waitWhileThenRun(function() {
        return ngModel.$pending && Object.keys(ngModel.$pending).length > 0;
      }, function() {
        expect(ngModel.$error.size).toBe(true);
        done();
      });
    });

    describe('and then unselected', function() {
      beforeEach(function() {
        element.prop('files', [undefined]);
        element.triggerHandler('change');
      });

      it('should not set the data url', function() {
        expect($parentScope.image).toBeUndefined();
      });

      it('should not have an error', function() {
        expect(ngModel.$error.image).toBeFalsy();
      });
    });
  };

  describe('previewImage directive with attrs', function() {
    var element, $parentScope;
    var context = {};
    beforeEach(function() {
      // using <p> instead of <input> because browser's don't allow setting the
      // 'file' property on the input element and therefore make this more
      // difficult to test
      var compiled = compile('<p image-with-preview ng-model="image"' +
        'accept="image/mockedpng,image/png,mockprefix/*"/>');
      element = compiled.element;
      $parentScope = compiled.parentScope;
      context.element = element;
      context.$parentScope = $parentScope;
    });

    describe('with an image path set on model', function() {
      beforeEach(function() {
        $parentScope.$apply(function() {
          $parentScope.image = 'some/image/path.jpg';
        });
      });

      it('should set the path as source', function() {
        expect($parentScope.image.src).toEqual('some/image/path.jpg');
      });
    });

    describe('image selection canceled', function() {
      beforeEach(function() {
        element.prop('files', [undefined]);
        element.triggerHandler('change');
      });

      it('should not set the data url', function() {
        expect($parentScope.image).toBeUndefined();
      });
    });

    describe('with an image with a specified (mocked) mimetype selected', function() {
      testSelectUnselectWorks('image/mockedpng', context);
    });

    describe('with an image with a specified (mocked and asterisk suffixed) mimetype selected', function() {
      testSelectUnselectWorks('mockprefix/whatever', context);
    });

    describe('with an image selected', function() {
      testPNGFile(context);
    });

    describe('with a non-image file selected', function() {
      testTextFile(context);
    });
  });

  describe('previewImage directive', function() {
    describe('with dimension restrictions set to true', function() {
      var context = {};
      beforeEach(function() {
        // using <p> instead of <input> because browser's don't allow setting the
        // 'file' property on the input element and therefore make this more
        // difficult to test
        var compiled = compile('<p image-with-preview ng-model="image" dimensions="true"/>');
        context.element = compiled.element;
        context.$parentScope = compiled.parentScope;
      });

      describe('with an image selected', function() {
        testPNGFile(context);
      });

      describe('with a non-image file selected', function() {
        testTextFile(context);
      });
    });

    describe('with dimension restrictions set to false', function() {
      var context = {};
      beforeEach(function() {
        // using <p> instead of <input> because browser's don't allow setting the
        // 'file' property on the input element and therefore make this more
        // difficult to test
        var compiled = compile('<p image-with-preview ng-model="image" dimensions="false"/>');
        context.element = compiled.element;
        context.$parentScope = compiled.parentScope;
      });

      describe('with an image selected', function() {
        testDimensionsCheckFails(context);
      });

      describe('with a non-image file selected', function() {
        testTextFile(context);
      });
    });

    describe('with dimension restrictions which will evaluate to false', function() {
      var context = {};
      beforeEach(function() {
        // using <p> instead of <input> because browser's don't allow setting the
        // 'file' property on the input element and therefore make this more
        // difficult to test
        var compiled = compile('<p image-with-preview ng-model="image" dimensions="heigth == 1 && width > 1"/>');
        context.element = compiled.element;
        context.$parentScope = compiled.parentScope;
      });

      describe('with an image selected', function() {
        testDimensionsCheckFails(context);
      });

      describe('with a non-image file selected', function() {
        testTextFile(context);
      });
    });

    describe('with dimension restrictions which will evaluate to true', function() {
      var context = {};
      beforeEach(function() {
        // using <p> instead of <input> because browser's don't allow setting the
        // 'file' property on the input element and therefore make this more
        // difficult to test
        var compiled = compile('<p image-with-preview ng-model="image" dimensions="height == 1 && width == 1"/>');
        context.element = compiled.element;
        context.$parentScope = compiled.parentScope;
      });

      describe('with an image selected', function() {
        testPNGFile(context);
      });

      describe('with a non-image file selected', function() {
        testTextFile(context);
      });
    });

    describe('with dimension restriction with multiple height/width var replacements', function() {
      var context = {};
      beforeEach(function() {
        // using <p> instead of <input> because browser's don't allow setting the
        // 'file' property on the input element and therefore make this more
        // difficult to test
      var dimensions = 'height < 400 && width < 2000 && width > 0.5 * height';
        var compiled = compile('<p image-with-preview ng-model="image" dimensions="' + dimensions + '"/>');
        context.element = compiled.element;
        context.$parentScope = compiled.parentScope;
      });

      describe('with an image selected', function() {
        testPNGFile(context);
      });

      describe('with a non-image file selected', function() {
        testTextFile(context);
      });
    });

    describe('with size restrictions which will evaluate to false', function() {
      var context = {};
      beforeEach(function() {
        // using <p> instead of <input> because browser's don't allow setting the
        // 'file' property on the input element and therefore make this more
        // difficult to test
        var compiled = compile('<p image-with-preview ng-model="image" size="size < 0"/>');
        context.element = compiled.element;
        context.$parentScope = compiled.parentScope;
      });

      describe('with an image selected', function() {
        testSizeCheckFails(context);
      });

      describe('with a non-image file selected', function() {
        testTextFile(context);
      });
    });

    describe('with size restrictions which will evaluate to true', function() {
      var context = {};
      beforeEach(function() {
        // using <p> instead of <input> becau§e browser's don't allow setting the
        // 'file' property on the input element and therefore make this more
        // difficult to test
        var compiled = compile('<p image-with-preview ng-model="image" size="size > 5"/>');
        context.element = compiled.element;
        context.$parentScope = compiled.parentScope;
      });

      describe('with an image selected', function() {
        testPNGFile(context);
      });

      describe('with a non-image file selected', function() {
        testTextFile(context);
      });
    });
  });

  describe('previewImage directive', function() {
    var context = {};
    beforeEach(function() {
      // using <p> instead of <input> because browser's don't allow setting the
      // 'file' property on the input element and therefore make this more
      // difficult to test
      var compiled = compile('<p image-with-preview ng-model="image"/>');
      context.element = compiled.element;
      context.$parentScope = compiled.parentScope;
    });

    describe('with an image selected', function() {
      testPNGFile(context);
    });

    describe('with a non-image file selected', function() {
      testTextFile(context);
    });
  });
});
