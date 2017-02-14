'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:GlobalCtrl
 * @description
 * # GlobalCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('GlobalCtrl', function ($scope, $cookieStore, $location, $route, logger, utiles) {
    logger.debug('corriendo');
    $scope.loading = false;
    $scope.error = null;
    $scope.claseMenu = utiles.menuActivo('inicio');
    $scope.usrSesion = {id: '', usuario: '', correo: '', conectado: '', rol: ''};
    if($cookieStore.get('conectado')!==null && $cookieStore.get('conectado')){
      var usuario = $cookieStore.get('usuario');
      $scope.$watch('usrConectado', function () {
        $scope.usrSesion.id = usuario.id;
        $scope.usrSesion.usuario = usuario.usuario;
        $scope.usrSesion.nombre = usuario.nombre;
        $scope.usrSesion.correo = usuario.correo;
        $scope.usrSesion.conectado = true;
        $scope.usrSesion.rol = usuario.rol;
      });
    }

    $scope.cerrarSesion = function () {
      $cookieStore.remove('conectado');
      $cookieStore.remove('usuario');
      $cookieStore.remove('rol');

      $scope.$watch('usrSesion', function () {
        $scope.usrSesion.id = '';
        $scope.usrSesion.nombre = '';
        $scope.usrSesion.usuario = '';
        $scope.usrSesion.correo = '';
        $scope.usrSesion.conectado = false;
      });

      //$location.path('/');
    };

    $scope.reloadRoute = function() {
      $route.reload();
    };
  });
