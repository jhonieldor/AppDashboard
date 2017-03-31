'use strict';

/**
 * @ngdoc function
 * @name appDashboardApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the appDashboardApp
 */
angular.module('ultraBI')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
