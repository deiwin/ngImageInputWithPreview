/**
 * Some tasks we need to perform before any test-suite starts.
 */
/* jshint undef: false, unused: false  */

/* some globals we might need later on, set in initGlobals */
var basicGlobals = [
  '$rootScope',
  '$compile',
  '$injector',
  '$httpBackend',
  '$q',
  '$controller'
];

/**
 * Initiate the angular module we want to test on and initiate
 * global angular modules required for testing (like $rootScope etc.)
 *
 * @param {bool} [withModule]  disable automatic module initiation
 *                             (by default, the module is initiated
 *                             automatically for you)
 * @paran {array} [additional] array of strings for additional modules
 *                             to be exposed on the window, can also be the first
 *                             parameter if withModule should be true
 */
function initGlobals(withModule, additional) {
  if (angular.isArray(withModule)) {
    additional = withModule;
    withModule = true;
  }

  if (!angular.isArray(additional)) {
    additional = [];
  }

  if (withModule !== false) {
    /* Initiate the main module */
    module('myModule');
  }

  inject(function($injector) {
    basicGlobals.concat(additional).forEach(function(global) {
      initGlobals.cleanup.push({name: global, value: window[global]});
      window[global] = $injector.get(global);
    });
  });
}
initGlobals.cleanup = [];

function createDirective() {
  if (!$compile) {
    throw new Error('globals were not initiated');
  }

  var r = {};

  /* Create the element for our directive */
  r.elm = angular.element('<div my-directive>');

  /* Apply the directive */
  $compile(r.elm)($rootScope);
  $rootScope.$digest();

  /* Save a reference to the directive scope */
  r.scope = r.elm.isolateScope() || r.elm.scope();

  return r;
}

/* Make sure, there are no unexpected request */
afterEach(function() {
  if (window.$httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }
});

/* Clean-up globals initiated by initGlobals */
afterEach(function() {
  initGlobals.cleanup.forEach(function(global) {
    if (angular.isUndefined(global.value)) {
      delete window[global.name];
    } else {
      window[global.name] = global.value;
    }
  });
  initGlobals.cleanup = [];
});
