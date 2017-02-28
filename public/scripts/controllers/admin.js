'use strict';


angular.module('ecommerceApp')
    .controller('AdminCtrl', function ($scope, $location, $cookieStore, server, $http) {
        $scope.administrador=false;
        $scope.usuarioAdmin = '';
        $scope.claveAdmin = '';
        if ($cookieStore.get('admin')!=null && $cookieStore.get('admin')){
            $scope.administrador = true;
            $scope.usuario = $cookieStore.get('usuario_admin');
        }


        $scope.ingresar = function () {
            console.log($scope.usuarioAdmin);
            console.log($scope.claveAdmin);
            $http({
                url: server+'usuarios/validar',
                dataType: 'json',
                method: 'POST',
                data: {usuario:$scope.usuarioAdmin, clave:$scope.claveAdmin}
            })
                .then(function (request) {
                    console.log(request.data);
                    if (request.data.success) {
                        if (request.data.code == 1){
                            console.log('entro');
                            console.log(request.data);
                            $cookieStore.put('admin', true);
                            $cookieStore.put('id_admin', request.data.rows[0].id);
                            $cookieStore.put('usuario_admin', $scope.usuario);
                            $cookieStore.put('rol_admin',  request.data.rows[0].rol);

                            $scope.administrador=true;
                        }

                    }
                })
                .finally(function () {


                });
        };

        $scope.cerrarSesionAdmin = function () {
            $cookieStore.remove('admin');
            $cookieStore.remove('id_admin');
            $cookieStore.remove('usuario_admin');
            $cookieStore.remove('rol_admin');
            $scope.administrador=false;
            $location.path('/admin/login');
        };

    });
