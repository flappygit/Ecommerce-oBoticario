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
            $scope.nombreFacebook=usuario.nombre_fb;
            $scope.$watch('usrConectado', function () {
                $scope.usrSesion.idfacebook = usuario.id_fb;
                $scope.usrSesion.nombre = usuario.nombre_fb;
                $scope.usrSesion.email = usuario.correo_fb;
                $scope.usrSesion.rol = "usuario_facebook";
                $scope.usrSesion.location = usuario.location_fb;
                $scope.usrSesion.conectado = true;
            });
        }


    });
