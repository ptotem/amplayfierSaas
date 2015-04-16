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
      getPortalNodes();
    });

    var getPortalNodes = function() {
      $http.get('/api/decks/portal/showDeckByPortal/' + $stateParams.portalId).success(function(nodes) {
        // $scope.portalNodes = nodes;
        $scope.portalNodes = [];
        _.forEach($scope.storyConfig.nodes, function(val, i) {
          var a = _.find(nodes, function(n) {
            return n.nodeNo.toString() === i.toString();
          });
          if (a) {
            $scope.portalNodes.push(a);
          } else {
            a = {}
            a.nodeNo = i.toString();
            a.decks = [];
            $scope.portalNodes.push(a);
          }
        });
        console.log(nodes);
        console.log($scope.portalNodes);

      });

    }

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
      $scope.selectedNodeId = nodeId;
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
      var l = Math.round(100 * parseFloat($(thisEle).css("left")) / parseFloat($(thisEle).parents('#story-wrapper').css("width"))) + "%";
      var t = Math.round(100 * parseFloat($(thisEle).css("top")) / parseFloat($(thisEle).parents('#story-wrapper').css("height"))) + "%";
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
      $('#uploadPPT').modal('hide');
      if (!$scope.editDeck) {
        var fields = {
          name: $scope.pptName,
          useDummy: $scope.useDummy,
          userId: $scope.currentUser._id,
          portalId: $stateParams.portalId,
          deckType: "Powerpoint",
          sequence: 0,
          nodeNo: $scope.nodeNo
        }
        var url = '/api/decks/portal/addPPTDeck'
      } else {
        var url = '/api/decks/portal/updatePPTDeck/' + $scope.selectedDeck._id;
        var fields = {
          name: $scope.pptName,
          userId: $scope.currentUser._id,
          portalId: $stateParams.portalId,
          nodeNo: $scope.selectedNodeId
        }
      }

      $upload.upload({
        url: url,
        fields: fields,
        file: $scope.pptFile[0],
        progress: function(evt) {
          console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        $scope.selectedDeck = null;
        $scope.editDeck = false;
        console.log(data);
        getPortalNodes();
      });
    }

    $scope.callUploadPPT = function(index) {
      $scope.nodeNo = index;
      $('#uploadPPT').modal('show');
    }

    $scope.callEditPPT = function(deck) {
      $scope.selectedDeck = deck;
      $scope.editDeck = true;
      $('#uploadPPT').modal('show');
    }

    $scope.showViewPPTModal = function(deck) {
      $scope.selectedPPT = _.sortBy(deck.slides, 'sequence');
      console.log($scope.selectedPPT);
      $('#viewPPTModal').modal('show');
      $('#viewPPTModal').find('.modal-content').hide();
      setTimeout(function() {
        $('.carousel-indicators').find('li').trigger('click');
        // $($('.carousel-indicators').find('li')[0]).trigger('click');
        $('#viewPPTModal').find('.modal-content').fadeIn(500);
      }, 50);

    };

    $scope.closeViewPPTModal = function() {
      $scope.selectedPPT = [];
      $('#viewPPTModal').modal('hide');
    }

    //function to remove deck from chapter
    $scope.removeDeck = function(deck) {
      $http.delete('/api/decks/' + deck._id + "/" + $scope.currentUser._id).success(function() {
        console.log("Deck Deleted");
        $scope.portalNodes[deck.nodeNo].decks = _.reject($scope.portalNodes[deck.nodeNo].decks, function(d) {
          return d._id.toString() === deck._id.toString();
        });
      });
    }

    // $scope.generateMoveToChapterTitle = function(index) {
    //   console.log(index);
    //   var arr = [];
    //   for (var i = 0; i < $scope.storyConfig.nodes.length; i++) {
    //     if (i !== index) {
    //       arr.push({
    //         name: "Chapter " + (i + 1),
    //         ind: i
    //       })
    //     }
    //   }
    //   return arr;
    // }
    $scope.moveToChapter = function(nodeNo, deck) {
      // alert(5);
      $http.post('/api/decks/moveTo/node/' + nodeNo + '/' + deck._id + '/' + $scope.currentUser._id).success(function(deck) {
        console.log(deck);
        getPortalNodes();
      });
    }

  });