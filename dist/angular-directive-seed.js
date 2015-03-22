/*!
 * angular-directive-seed v0.0.0
 * https://github.com/Jimdo/angular-directive-seed
 *
 * A starting point for angular directives.
 *
 * Copyright 2014, Jimdo GmbH
 * Released under the MIT license
 */
(function(angular, undefined) {
  'use strict';

  // src/js/helper.module.js
  var myModule = angular.module('myModule', []);

  // src/js/directive.directive.js
  myModule.directive('myDirective', function() {
    return {
      templateUrl: 'directive.html',
      controller: ['$scope', function($scope) {
        $scope.foo = 'bar';
      }]
    };
  });

  // .tmp/all-partials.js
  angular.module('myModule').run(['$templateCache', function($templateCache) {
    'use strict';
  
    $templateCache.put('directive.html',
      "<div><h1>My Directive</h1><h2>{{foo}}</h2></div>"
    );
  
  }]);
})(window.angular);
