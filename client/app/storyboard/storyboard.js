'use strict';

angular.module('amplayfierSaasApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('storyboard', {
        url: '/storyboard/list',
        templateUrl: 'app/storyboard/storyboard.html',
        controller: 'StoryboardCtrl',
        css: {
          href: "assets/css/application.css",
          preload: true
        }
      });
  });