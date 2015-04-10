'use strict';

angular.module('amplayfierSaasApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl',
        css: [
          "assets/css/theme-assets.min.css",
          'assets/css/bootstrap.min.css',
          "http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.min.css",
          "assets/css/logo-font.css",
          "assets/css/theme-min.css",
          "assets/css/custom.css"
        ]
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'app/account/login/signin.html',
        controller: 'SigninCtrl',
        css: [
          "assets/css/theme-assets.min.css",
          'assets/css/bootstrap.min.css',
          "http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.min.css",
          "assets/css/logo-font.css",
          "assets/css/theme-min.css",
          "assets/css/custom.css"
        ]
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });