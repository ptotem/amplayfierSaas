'use strict';

angular.module('amplayfierSaasApp')
  .filter('rawHtml', ['$sce', function($sce) {
    return function(val) {
      return $sce.trustAsHtml(val);
    };
  }]);