'use strict';

angular.module('amplayfierSaasApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('portal', {
        url: '/portal',
        templateUrl: 'app/portal/portal.html',
        controller: 'PortalCtrl',
        css: [{
          href: "assets/css/application.css",
          preload: true,
          persist: true,
          bustCache: true,
          method: 'prepend'
        }, {
          href: "assets/css/story-page.css",
          preload: true,
          persist: true,
          bustCache: true,
          method: 'prepend'
        }, {
          href: "assets/css/editor.css",
          preload: true,
          persist: true,
          bustCache: true,
          method: 'prepend'
        }]
      });
  });