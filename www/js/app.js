// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

(function(){

  app = angular.module('UserDirectory', ['ionic', 'UserDirectory.userstore', 'chart.js']);

  app.config(function($stateProvider, $urlRouterProvider){

    $stateProvider.state('list', {
      url: '/list',
      templateUrl: 'templates/list.html'
    });

    $stateProvider.state('add', {
      url: '/add',
      templateUrl: 'templates/edit.html',
      controller: 'AddCtrl'
    });

    $stateProvider.state('edit', {
      url: '/edit/:userId',
      templateUrl: 'templates/edit.html',
      controller: 'EditCtrl'
    });

    $stateProvider.state('visual', {
      url: '/visual',
      templateUrl: 'templates/visual.html',
      controller: 'VisualCtrl'
    });

    $urlRouterProvider.otherwise('/list');

  });

  app.controller('ListCtrl', function($scope, UserStore){
    $scope.reordering = false;
    $scope.users = UserStore.list();

    $scope.remove = function(userId){
      UserStore.remove(userId);
    }

    $scope.move = function(user, fromIndex, toIndex){
      UserStore.move(user, fromIndex, toIndex);
    }

    $scope.toggleReordering = function(){
      $scope.reordering = !$scope.reordering;
    }
  });

  app.controller('AddCtrl', function($scope, $state, UserStore){
    $scope.user = {
      id: new Date().getTime().toString(),
      name: "",
      age: "",
      gender: "",
      nationality: ""
    };
    $scope.save = function(){
      UserStore.create($scope.user);
      $state.go('list');
    };
  });

  app.controller('EditCtrl', function($scope, $state, UserStore){
    $scope.user = angular.copy(UserStore.get($state.params.userId));
    $scope.save = function(){
      UserStore.update($scope.user);
      $state.go('list');
    };
  });

  app.controller('VisualCtrl', function($scope, $state, UserStore){
    $scope.visual = UserStore.visual();

    $scope.labels = $scope.visual[0];
    $scope.series = $scope.visual[1];
    $scope.data = $scope.visual[2];
    $scope.pie_data = $scope.visual[3];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
  });

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

}());
