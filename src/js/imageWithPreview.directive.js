/*jshint -W072 */
// ^ ignore jshint warning about link method having too many parameters
(function() {
  'use strict';
  var module = angular.module('ngImageInputWithPreview', [
    'fileReaderService',
  ]);

  module.directive('imageWithPreview', ['fileReader', '$q',
    function(fileReader, $q) {
      var DEFAULT_MIMETYPES = 'image/png,image/jpeg';
      var NOT_AN_IMAGE = 'this-is-not-an-image';

      var isAnAllowedImage = function(allowedTypes, file) {
        if (!allowedTypes) {
          allowedTypes = DEFAULT_MIMETYPES;
        }
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
