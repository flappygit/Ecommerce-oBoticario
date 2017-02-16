'use strict';

/**
 * @ngdoc function
 * @name ecommerceApp.controller:GlobalCtrl
 * @description
 * # GlobalCtrl
 * Controller of the ecommerceApp
 */
angular.module('ecommerceApp')
  .controller('GlobalCtrl', function ($scope, $cookieStore, $location, $route, logger,$http) {
    logger.debug('RUNNING ANGULAR JS');
    $scope.usrSesion = {idfacebook: '', nombre: '', email: '', rol: '', location: '', conectado: false};
    if($cookieStore.get('conectado')){

      var usuario = $cookieStore.get('usuario');
      $scope.logged=true;
      $scope.nombreFacebook=usuario.name;
        $scope.$watch('usrConectado', function () {
        $scope.usrSesion.idfacebook = usuario.id;
        $scope.usrSesion.nombre = usuario.name;
        $scope.usrSesion.email = usuario.email;
        $scope.usrSesion.rol = "usuario_facebook";
        $scope.usrSesion.location = usuario.location;
        $scope.usrSesion.conectado = true;
      });
    }

    
  });
