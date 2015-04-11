'use strict';

describe('Filter: rawHtml', function () {

  // load the filter's module
  beforeEach(module('amplayfierSaasApp'));

  // initialize a new instance of the filter before each test
  var rawHtml;
  beforeEach(inject(function ($filter) {
    rawHtml = $filter('rawHtml');
  }));

  it('should return the input prefixed with "rawHtml filter:"', function () {
    var text = 'angularjs';
    expect(rawHtml(text)).toBe('rawHtml filter: ' + text);
  });

});
