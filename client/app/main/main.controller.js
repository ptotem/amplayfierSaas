'use strict';

angular.module('amplayfierSaasApp')
  .controller('MainCtrl', function($scope, $http, socket, Auth, $location) {

    $scope.awesomeThings = [];
    $scope.currentUser = Auth.getCurrentUser();
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $http.get('/api/storyboards').success(function(storyboards) {
      $scope.storyboards = storyboards;
      socket.syncUpdates('storyboard', $scope.storyboards);
    });

    $http.get('/api/portals/user/' + $scope.currentUser._id).success(function(portals) {
      $scope.portals = portals;
      $scope.allPortals = portals;
      socket.syncUpdates('portals', $scope.portals);
    });

    $scope.addPortal = function() {
      if ($scope.newPortalName === '') {
        return;
      }
      $http.post('/api/portals', {
        name: $scope.newPortalName,
        uname: $scope.newPortalName,
        role: "Admin",
        userId: $scope.currentUser._id
      }).success(function(newPortal) {
        $scope.allPortals.push(newPortal);
        // $scope.portals.push(newPortal);
        $('#newPortal').modal("hide");
      });
      $scope.newPortalName = '';

    };

    $scope.deletePortal = function(portal) {
      $http.delete('/api/portals/' + portal._id);
      $scope.allPortals = _.reject($scope.allPortals, function(ap) {
        return ap._id === portal._id;
      });
      console.log($scope.allPortals);
      $scope.portals = $scope.allPortals;
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
      window.location.reload();
    };


    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });

    $scope.searchPortals = function() {
      var a = [];
      for (var i = 0; i < $scope.allPortals.length; i++) {
        if ($scope.allPortals[i].name.toLowerCase().indexOf($scope.searchTerm.toString().toLowerCase()) !== -1) {
          a.push($scope.allPortals[i]);
        }
      }
      $scope.portals = a;
    }

    $scope.checkAvailability = function() {
      $scope.someVal = _.find($scope.portals, function(ap) {
        return ap.uname.indexOf($scope.newPortalName) !== -1;
      });
      if ($scope.someVal) {
        $scope.availibility = false;
        $('#checkAvailability').show();
        $('#createPortal').hide();
        return false;
      } else {
        $scope.availibility = true;
        $('#checkAvailability').hide();
        $('#createPortal').show();
        return true;
      }
    }
    $scope.open = function(size) {
      $('#newPortal').modal("show")
    };

    $scope.selecteStoryBoard = function(storyboard) {
      $scope.selectedStoryBoard = storyboard;
      $('#modalStoryboard').modal('show');
    }
  });