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

  var testSelectUnselectShouldNotWork = function(type, context) {
    var file, ngModel, element, $parentScope;
    beforeEach(function() {
      element = context.element;
      $parentScope = context.$parentScope;
      file = {
        type: type,
      };
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

  var testSelectUnselectWorks = function(type, context) {
    var result, file, element, $parentScope;
    beforeEach(inject(function($q, fileReader) {
      var deferred = $q.defer();
      element = context.element;
      $parentScope = context.$parentScope;
      result = 'result data';
      deferred.resolve(result);
      fileReader.readAsDataUrl = jasmine.createSpy().and.returnValue(deferred.promise);

      file = {
        type: type,
      };
      element.prop('files', [file]);
      element.triggerHandler('change');
    }));

    it('should set the data url the result', function() {
      expect($parentScope.image.src).toEqual(result);
    });

    describe('and then unselected', function() {
      beforeEach(function() {
        element.prop('files', [undefined]);
        element.triggerHandler('change');
      });

      it('should set the data url to an empty string', function() {
        expect($parentScope.image).toBeUndefined();
      });
    });
  };

  var testTextFile = function(context) {
    testSelectUnselectShouldNotWork('text/plain', context);
  };

  var testPNGFile = function(context) {
    testSelectUnselectWorks('image/png', context);
  };

  describe('previewImage directive', function() {
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

  describe('previewImage directive without accept attr', function() {
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
