'use strict';

/**
 * @ngdoc function
 * @name ecommerceApp.controller:GlobalCtrl
 * @description
 * # GlobalCtrl
 * Controller of the ecommerceApp
 */
angular.module('ecommerceApp')
    .controller('PublicacionesCtrl', function ($scope, $cookieStore, $location, server,$http) {

        $scope.seleccionado = [];
        $scope.hecho = [];

        $scope.seleccionarItem = function (id) {
            $scope.seleccionado = [];
            $scope.seleccionado[id] = 'alert alert-warning';
        };

        $scope.ganador = function(id, descripcion){
            $http({
                url: server+'correos-enviados/enviarcorreoGanador',
                dataType: 'json',
                method: 'POST',
                data: {correo:1, clave:'400226926995567', id:id, descripcion:descripcion}
            })
                .then(function (request) {
                    if (!request.data.success) {
                        console.log("then pero no envio correo");
                        console.log(request);
                    }else {
                        console.log('correo enviado');
                        $scope.seleccionado[id] = 'alert alert-success';
                        $scope.hecho[id] = true;
                    }
                })
                .catch(function (error) {
                    console.log('Error, No se envio el correo');
                    console.log(error);
                });
        };
        $scope.tramposo = function(id, descripcion){
            $http({
                url: server+'correos-enviados/enviarcorreoTramposo',
                dataType: 'json',
                method: 'POST',
                data: {correo:1, clave:'400226926995567', id:id, descripcion:descripcion}
            })
                .then(function (request) {
                    if (!request.data.success) {
                        console.log("then pero no envio correo");
                        console.log(request);
                    }else {
                        console.log('correo enviado');
                        $scope.seleccionado[id] = 'alert alert-danger';
                        $scope.hecho[id] = true;
                    }
                })
                .catch(function (error) {
                    console.log('Error, No se envio el correo');
                    console.log(error);
                });

        };

        $http({
            url: server+'publicaciones/culminados',
            dataType: 'json',
            method: 'get'
        })
            .then(function (request) {
                console.log(request);
                if (request.data.success) {

                    $scope.culminados = request.data.message;
                }
            })
            .finally(function () {


            });
        $http({
            url: server+'publicaciones/validados',
            dataType: 'json',
            method: 'get'
        })
            .then(function (request) {
                console.log(request);
                if (request.data.success) {

                    $scope.validados = request.data.message;
                }
            })
            .finally(function () {


            });

        $http({
            url: server+'publicaciones/',
            dataType: 'json',
            method: 'get'
        })
            .then(function (request) {
                console.log(request);
                if (request.data.success) {

                    $scope.entidad = request.data.message;
                }
            })
            .finally(function () {


            });


        $scope.cerrarSesionAdmin = function () {
            $cookieStore.remove('admin');
            $cookieStore.remove('id_admin');
            $cookieStore.remove('usuario_admin');
            $cookieStore.remove('rol_admin');
            $scope.administrador=false;
            $location.path('/admin/login');
        };

    });
