'use strict';

/**
 * @ngdoc function
 * @name ultraBI.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stockDogApp
 */
angular.module('ultraBI')
  .controller('MainCtrl', function ($scope, $location) {
    // [2] Using the $location.path() function as a $watch expression
    $scope.$watch(function () {
      return $location.path();
    }, function (path) {

      if(path.includes('dashboard')){
        $scope.activeView = 'dashboard';
      }

      if(path.includes('ultradashboard')){
        $scope.activeView = 'ultradashboard';
      }

    });
  });
