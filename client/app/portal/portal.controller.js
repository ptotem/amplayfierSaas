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
      // createLandscapeView();
    }

    $scope.selectStory = function() {
      $scope.storyConfig = $scope.selectedStory.storyConfig;
      console.log("done");
      console.log($scope.selectedStory);
    }

    $scope.openEditor = function(nodeId) {
      $('.edit-intro').hide();
      $('.node-rep-block').removeClass('active-rep-block');
      $('.node-rep-block').eq(parseInt(nodeId) - 1).addClass('active-rep-block');
      $('.editdecklist').sortable();
      $('.edit-chapter').fadeOut(function() {
        $('#edit-chapter-' + nodeId).fadeIn(function() {
          $(this).find('.edit-closer').unbind('click').on('click', function() {
            $('.node-rep-block').removeClass('active-rep-block');
            $('.edit-chapter').hide();
            $('.edit-intro').fadeIn();
          })
        });
      })
    }

    $scope.closeEditor = function() {
      $('#story-wrapper').animate({
        marginLeft: 0
      }, function() {
        $('#editor-panel').fadeOut();
        $('.story-node').css('pointer-events', 'auto');
      })
    }

    $scope.convertingToPercentage = function(thisObj) {
      // console.log($scope.storyConfig.presenter);
      var thisEle = $(thisObj.target);
      var l = Math.round(100 * parseFloat($(thisEle).css("left")) / parseFloat($(thisEle).parent().css("width"))) + "%";
      var t = Math.round(100 * parseFloat($(thisEle).css("top")) / parseFloat($(thisEle).parent().css("height"))) + "%";
      $(thisEle).css("top", t);
      $(thisEle).css("left", l);
      if ($(thisEle).attr("data-category") === "presenter") {
        $scope.storyConfig.presenter.px = l;
        $scope.storyConfig.presenter.py = t;
      } else if ($(thisEle).attr("data-category") === "nameplate") {
        $scope.storyConfig.nameplate.px = l;
        $scope.storyConfig.nameplate.py = t;
      } else if ($(thisEle).attr('data-category') === "node") {
        var index = _.indexOf($scope.storyConfig.nodes, _.find($scope.storyConfig.nodes, function(node) {
          return node.sequence === parseInt($(thisEle).attr("data-seq"));
        }));
        $scope.storyConfig.nodes[index].px = l;
        $scope.storyConfig.nodes[index].py = t;
      }
      $http.put('/api/portals/updatePosition/' + $stateParams.portalId, {
        storyConfig: $scope.storyConfig
      }).success(function(port) {
        console.log("Updated successfully!");
      });
      console.log($scope.storyConfig.presenter);
    }

    $scope.addPPTDeck = function($files) {
      console.log($scope.pptFile[0])
      $('#uploadPPT').modal('hide');
      $upload.upload({
        url: '/api/decks/portal/addPPTDeck',
        fields: {
          name: $scope.pptName,
          useDummy: $scope.useDummy,
          userId: $scope.currentUser._id,
          portalId: $stateParams.portalId
        },
        file: $scope.pptFile[0],
        progress: function(evt) {
          console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
      });
    }

  });