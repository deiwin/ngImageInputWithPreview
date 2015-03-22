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
