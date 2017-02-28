'use strict';

/**
 * @ngdoc function
 * @name ecommerceApp.controller:GlobalCtrl
 * @description
 * # GlobalCtrl
 * Controller of the ecommerceApp
 */
angular.module('ecommerceApp')
    .controller('ProductosCtrl', function ($scope, $cookieStore, $location, server,$http) {
        $http({
            url: server+'productos/',
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
