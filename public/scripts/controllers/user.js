'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:userCtrl
 * @description
 * # userCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('userCtrl', function ($scope, $http,$location, server, conexion) {
    
    $scope.proyectos = null;
    $scope.$parent.loading = true;
          
          if ($location.path()=='/administrar') {
            $('body').css({
              'overflow-y':'scroll'
            });
          }

    var pagina = server+'';
    $http.get(pagina)
      .then(function (request) {
        var error = conexion.verificarRequest(request.data);
        if (error === null){
          $scope.$parent.error = null;
          $scope.proyectos = request.data.data;
        }else {
          $scope.$parent.error = error;
        }
      })
      .catch(function (err) {
        $scope.$parent.error = conexion.verificarError(err);
      })
      .finally(function () {
        $scope.$parent.loading = false;
      });
  });
