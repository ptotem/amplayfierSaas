'use strict';

describe('Controller: PortalCtrl', function () {

  // load the controller's module
  beforeEach(module('amplayfierSaasApp'));

  var PortalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PortalCtrl = $controller('PortalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
