'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:indexCtrl
 * @description
 * # indexCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('indexCtrl', function ($scope, $cookieStore, $location, $http, logger, server, conexion) {
    $scope.$parent.error1 = null;
    $scope.usuario = {nombre:'', clave:''};

    function usrASesion(usuario) {
      $scope.$watch('usrConectado', function () {
        $scope.usrSesion.nombre = usuario.nombre;
        $scope.usrSesion.usuario = usuario.usuario;
        $scope.usrSesion.rol = usuario.rol;
        $scope.usrSesion.correo = usuario.correo;
        $scope.usrSesion.conectado = true;
      });

      usuario.clave = $scope.usuario.clave;
      $cookieStore.put('conectado', true);
      $cookieStore.put('usuario', usuario);
      $cookieStore.put('rol', usuario.rol);
      $location.path('/');
    }
    $scope.iniciarSesion = function() {
      $scope.$parent.loading1 = true;
      $scope.$parent.error1 = null;
      var url = 'http://localhost:3000/users/ValidUserFacebook';
      $http({
        url: url,
        dataType: 'json',
        method: 'POST',
        data: {
          u: $scope.usuario.nombre,
          p: $scope.usuario.clave
        }
      })
        .then(function (request) {
          var error = conexion.verificarRequest(request.data);
          if (error === null){
            $scope.$parent.error1 = null;
            usrASesion(request.data.usuario);
          }else {
            $scope.$parent.error1 = error;
          }
        })
        .catch(function (err) {
          logger.debug('error');
          $scope.$parent.error1 = conexion.verificarError(err);
        })
        .finally(function () {
          $scope.$parent.loading1 = false;

        });
    };
  });
