'use strict';

/**
 * @ngdoc service
 * @name ultraBI.ClientesService
 * @description
 * # ClientesService
 * Service in the stockDogApp.
 */
angular.module('ultraBI')
  .service('ClientesService', function ClientesService($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $resource('Clientes2.json');
  });
