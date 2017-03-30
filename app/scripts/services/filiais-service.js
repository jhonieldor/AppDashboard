'use strict';

/**
 * @ngdoc service
 * @name ultraBI.Filiais
 * @description
 * # Filiais
 * Service in the stockDogApp.
 */
angular.module('ultraBI')
  .service('FiliaisService', function FiliaisService($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $resource('Filiais.json');
  });
