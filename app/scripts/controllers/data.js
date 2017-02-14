'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:DataCtrl
 * @description
 * # DataCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('DataCtrl', function ($scope, utiles,$location) {
    $scope.$parent.claseMenu = utiles.menuActivo('data');
    $scope.$parent.loading = false;
     if ($location.path()=='/data') {
            $('body').css({
              'overflow-y':'scroll'
            });
          }
  });
