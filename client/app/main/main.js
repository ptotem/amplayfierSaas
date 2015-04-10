'use strict';

angular.module('amplayfierSaasApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main1.html',
        controller: 'MainCtrl',
        css: {
          href: "assets/css/application.css",
          preload: true,
          method: "prepend"
        },
        authenticate: true
      })
  });