/* global myModule */
myModule.directive('myDirective', function() {
  return {
    templateUrl: 'directive.html',
    controller: function($scope) {
      $scope.foo = 'bar';
    }
  };
});
