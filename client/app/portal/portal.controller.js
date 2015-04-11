'use strict';

angular.module('amplayfierSaasApp')
  .controller('PortalCtrl', function($stateParams, $scope, Auth, $http, $upload) {
    $scope.message = 'Hello';
    $scope.currentUser = Auth.getCurrentUser();

    $scope.ppts = [{
      name: 1
    }, {
      name: 2
    }, {
      name: 3
    }];


    $http.get('/api/games').success(function(games) {
      $scope.games = games;
    });

    $http.get('/api/portals/' + $stateParams.portalId).success(function(portal) {
      $scope.portal = portal;
      $http.get('/api/storyboards').success(function(storyboards) {
        $scope.storyboards = storyboards;
        if ($scope.portal.storyConfig) {
          $scope.storyConfig = $scope.portal.storyConfig;
        } else {
          $scope.storyConfig = storyboards[0].storyConfig;
        }
        if ($scope.storyConfig.backUrl) {
          $scope.swBackDirect = {
            'background-image': 'url("' + $scope.storyConfig.backUrl + '")',
            'height': '500px'
          }
        }
        $scope.swBackInDirect = {
          'background-image': 'url("' + $scope.storyConfig.imgsrc + '/' + $scope.storyConfig.background + '")',
          'height': '500px',
          'display': 'block'
        }
        console.log($scope.storyConfig)
        $scope.initPage();
      });

    });

    $scope.onFileSelect = function($files) {
      // alert();
      //$files: an array of files selected, each file has name, size, and type.
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        // console.log($file);
        $upload.upload({
          url: '/api/portals/picture/addBackground',
          fields: {
            portalId: $stateParams.portalId
          },
          file: file,
          progress: function(evt) {
            // console.log(e);
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
          }
        }).success(function(data, status, headers, config) {
          // file is uploaded successfully
          // console.log(data);
          $scope.storyConfig = data.storyConfig;
          console.log($scope.storyConfig);
        });
      }
    }

    $scope.onFileSelectPresenter = function($files) {
      // alert();
      //$files: an array of files selected, each file has name, size, and type.
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        // console.log($file);
        $upload.upload({
          url: '/api/portals/picture/changePresenter',
          fields: {
            portalId: $stateParams.portalId
          },
          file: file,
          progress: function(evt) {
            // console.log(e);
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
          }
        }).success(function(data, status, headers, config) {
          // file is uploaded successfully
          // console.log(data);
          $scope.storyConfig = data.storyConfig;
          console.log($scope.storyConfig);
        });
      }
    }

    $scope.onFileSelectNamePlate = function($files) {
      // alert();
      //$files: an array of files selected, each file has name, size, and type.
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        // console.log($file);
        $upload.upload({
          url: '/api/portals/picture/changeNamePlate',
          fields: {
            portalId: $stateParams.portalId
          },
          file: file,
          progress: function(evt) {
            // console.log(e);
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
          }
        }).success(function(data, status, headers, config) {
          // file is uploaded successfully
          // console.log(data);
          $scope.storyConfig = data.storyConfig;
          console.log($scope.storyConfig);
        });
      }
    }

    $scope.loadGame = function(game, $event) {
      var thisObj = $event.currentTarget;
      var gameName = game.title;
      $('#' + gameName.toLowerCase() + '-window').append('<iframe width="98%" height="100%" src="' + game.gamePath + '"></iframe>');
      $(thisObj).hide();
      $(thisObj).next().fadeIn();
    }

    $scope.unloadGame = function($event) {
      var thisObj = $event.currentTarget;
      $('.modal-game-window').empty();
      $(thisObj).hide();
      $(thisObj).prev().fadeIn();
    }

    $scope.initPage = function() {

      /* Set the Title of the Platform */
      $('title').text($scope.storyConfig.name + " Editor");

      /* Set the Wrapper Design */
      setDesign($scope.storyConfig);

      /* Show the screen */
      setTimeout(function() {
        createLandscapeView();
        $('#story-wrapper').fadeIn('slow');

      }, 500);
    }

    var setDesign = function(storyConfig) {

      /* Set the Story Nameplate */
      // $('#story-nameplate').css({
      //   left: storyConfig.nameplate.px + "%",
      //   top: storyConfig.nameplate.py + "%",
      //   width: storyConfig.nameplate.width + "%",
      //   position: "absolute"
      // }).draggable();
      //
      // /* Set the Story Presenter */
      // $('#story-presenter').css({
      //   left: storyConfig.presenter.px + "%",
      //   top: storyConfig.presenter.py + "%",
      //   width: storyConfig.presenter.width + "%",
      // }).draggable();

      // $('#story-wrapper').css({
      //     'background-image': 'url(' + storyConfig.imgsrc + "/" + storyConfig.background + ')',
      //   height: $('#story-wrapper').width() * 9 / 16
      // });

    }

    $scope.selectStory = function() {
      $scope.storyConfig = $scope.selectedStory.storyConfig;
      console.log("done");
      console.log($scope.selectedStory);
    }


  });