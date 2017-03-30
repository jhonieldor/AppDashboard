'use strict';

/**
 * @ngdoc service
 * @name ultraBI.Vendas
 * @description
 * # Vendas
 * Service in the stockDogApp.
 */
angular.module('ultraBI')
  .service('VendasService', function VendasService($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $resource('Vendas.json');

  });
