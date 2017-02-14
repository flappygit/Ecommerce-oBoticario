'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:ActividadesCtrl
 * @description
 * # ActividadesCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('ActividadesCtrl', function ($scope, utiles) {
    $scope.$parent.claseMenu = utiles.menuActivo('actividades');
    $scope.$parent.loading = false;
  });
