/*!
 * ng-image-input-with-preview v0.0.4
 * https://github.com/deiwin/ngImageInputWithPreview
 *
 * A FileReader based directive to easily preview and upload image files.
 *
 * Copyright 2015, Deiwin Sarjas <deiwin.sarjas@gmail.com>
 * Released under the MIT license
 */
(function(angular, undefined) {
  'use strict';

  // src/js/fileReader.service.js
  (function() {
    'use strict';
    var module = angular.module('fileReaderService', []);
  
    // Copied from the following link with onProgress excluded because it's not needed
    // http://odetocode.com/blogs/scott/archive/2013/07/03/building-a-filereader-service-for-angularjs-the-service.aspx
    module.factory('fileReader', ['$q',
      function($q) {
        var onLoad = function(reader, deferred, scope) {
          return function() {
            scope.$apply(function() {
              deferred.resolve(reader.result);
            });
          };
        };
  
        var onError = function(reader, deferred, scope) {
          return function() {
            scope.$apply(function() {
              deferred.reject(reader.result);
            });
          };
        };
  
        var getReader = function(deferred, scope) {
          var reader = new FileReader();
          reader.onload = onLoad(reader, deferred, scope);
          reader.onerror = onError(reader, deferred, scope);
          return reader;
        };
  
        var readAsDataURL = function(file, scope) {
          var deferred = $q.defer();
  
          var reader = getReader(deferred, scope);
          reader.readAsDataURL(file);
  
          return deferred.promise;
        };
  
        return {
          readAsDataUrl: readAsDataURL
        };
      }
    ]);
  })();

  // src/js/imageWithPreview.directive.js
  /*jshint -W072 */
  // ^ ignore jshint warning about link method having too many parameters
  (function() {
    'use strict';
    var module = angular.module('ngImageInputWithPreview', [
      'fileReaderService',
    ]);
  
    module.directive('imageWithPreview', ['fileReader', '$q',
      function(fileReader, $q) {
        var NOT_AN_IMAGE = 'this-is-not-an-image';
        var isAnAllowedImage = function(allowedTypes, file) {
          var allowedTypeArray = allowedTypes.split(',');
          return allowedTypeArray.some(function(allowedType) {
            if (allowedType === file.type) {
              return true;
            }
            var allowedTypeSplit = allowedType.split('/');
            var fileTypeSplit = file.type.split('/');
            return allowedTypeSplit.length === 2 && fileTypeSplit.length === 2 && allowedTypeSplit[1] === '*' &&
              allowedTypeSplit[0] === fileTypeSplit[0];
          });
        };
        return {
          restrict: 'A',
          require: 'ngModel',
          scope: {
            image: '=ngModel',
            allowedTypes: '@accept',
          },
          link: function($scope, element, attrs, ngModel) {
            element.bind('change', function(event) {
              var file = (event.srcElement || event.target).files[0];
              // the following link recommends making a copy of the object, but as the value will only be changed
              // from the view, we don't have to worry about making a copy
              // https://docs.angularjs.org/api/ng/type/ngModel.NgModelController#$setViewValue
              ngModel.$setViewValue(file, 'change');
            });
            ngModel.$parsers.push(function(file) {
              if (!file) {
                return file;
              }
              if (!isAnAllowedImage($scope.allowedTypes, file)) {
                return NOT_AN_IMAGE;
              }
              return {
                fileReaderPromise: fileReader.readAsDataUrl(file, $scope),
              };
            });
            $scope.$watch('image', function(value) {
              if (value && typeof value === 'string') {
                $scope.image = {
                  src: value,
                  isPath: true,
                };
              }
            });
            ngModel.$validators.image = function(modelValue, viewValue) {
              var value = modelValue || viewValue;
              return value !== NOT_AN_IMAGE;
            };
            ngModel.$asyncValidators.parsing = function(modelValue, viewValue) {
              var value = modelValue || viewValue;
              var deferred = $q.defer();
              if (value && value.fileReaderPromise) {
                var promise = value.fileReaderPromise;
                delete value.fileReaderPromise;
                promise.then(function(dataUrl) {
                  value.src = dataUrl;
                  deferred.resolve(true);
                }, function() {
                  deferred.resolve(false);
                });
              } else {
                deferred.resolve(true);
              }
              return deferred.promise;
            };
          }
        };
      }
    ]);
  })();
})(window.angular);