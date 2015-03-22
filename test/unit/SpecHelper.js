/**
 * Some tasks we need to perform before any test-suite starts.
 */
/* jshint undef: false, unused: false  */

function compile(html) {
  var element, scope, parentScope;
  inject(function($compile, $rootScope, $timeout) {
    parentScope = $rootScope.$new();
    // if (prepareParentFunction) {
    //   parentScope.$apply(function() {
    //     prepareParentFunction(parentScope);
    //   });
    // }
    element = angular.element(html);
    $compile(element)(parentScope);
    $timeout(function() {
      scope = element.isolateScope();
      parentScope.$digest();
    });
    $timeout.flush();
  });

  return {
    element: element,
    scope: scope,
    parentScope: parentScope
  };
}

/* Make sure, there are no unexpected request */
afterEach(function() {
  if (window.$httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }
});
