'use strict';

describe('Controller: StoryboardCtrl', function () {

  // load the controller's module
  beforeEach(module('amplayfierSaasApp'));

  var StoryboardCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StoryboardCtrl = $controller('StoryboardCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
