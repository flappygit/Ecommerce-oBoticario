'use strict';

/**
 * @ngdoc function
 * @name ecommerceApp.controller:indexCtrl
 * @description
 * # indexCtrl
 * Controller of the ecommerceApp
 */
angular.module('ecommerceApp')
    .controller('indexCtrl', function ($scope, $cookieStore, $location, $http, logger, server, conexion) {
        logger.debug('Controller INDEX ');
        $(function () {
            $(".footer").hide();
        });
        $scope.logged=false;
        $scope.error = null;
        if($location.path()=='/'){
            $location.path('/inicio')
        }
        $scope.usrSesion = { idfacebook: '', nombre: '', email: '', rol: '', location: '', conectado: false};

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

        function usrASesion(usuario) {
            $scope.$watch('usrConectado', function () {
                $scope.usrSesion.idfacebook = usuario.id_fb;
                $scope.usrSesion.nombre = usuario.nombre_fb;
                $scope.usrSesion.email = usuario.correo_fb;
                $scope.usrSesion.rol = "usuario_facebook";
                $scope.usrSesion.location = usuario.location_fb;
                $scope.usrSesion.conectado = true;
            });
            $cookieStore.put('conectado', true);
            $cookieStore.put('usuario', usuario);
            $cookieStore.put('id', usuario.id);
            $cookieStore.put('rol', "usuario_facebook");
        }
        $scope.userPerfil = function () {
            $location.path('/user');
        }

        //Shared Dialog
        $scope.sharingPost= function  ( ) {
            FB.ui({
                method: 'share',
                hashtag: '#CreeEnlabelleza#oBoticário',
                quote: 'La belleza tiene un poder inexplicable para tocar el corazón y resaltar las cosas buenas de las personas.',
                display: 'popup',
                mobile_iframe: true,
                href: 'http://oboticario.com.co/malbec/index.php',
            }, function(response){
                console.log(response);

            });
        }

        //Login Facebook
        $scope.FBLogin = function () {
            FB.login(function(response) {
                if (response.authResponse) {
                    FB.api('/me?fields=id,name,email,birthday,location', function(response) {
                        if (response.location) {
                            var localidad=response.location.name;
                        }else{
                            var localidad="No hay localidad";
                        }

                        var email;
                        if (response.location) {
                            email=response.email;
                        }else{
                            email="Not Permission";
                        }

                        var datos=
                            {
                                id:response.id,
                                name:response.name,
                                email:email,
                                location:localidad
                            };
                        $http({
                            url: 'http://localhost:3000/users/ValidUserFacebook',
                            dataType: 'json',
                            method: 'POST',
                            data: datos
                        })
                            .then(function (request) {
                                if (request.data.success==true) {
                                    usrASesion(request.data.message[0]);
                                    $scope.logged=true;
                                    $scope.nombreFacebook=datos.name;
                                    if (request.data.repeat==true) {
                                        console.log("Usuario ya se encuentra registrado");
                                    }else{
                                        console.log("nuevo Usuario");
                                    }
                                }else{
                                    console.log("Error");
                                }
                            })
                            .finally(function () {


                            });

                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }

            }, {scope: 'email,user_likes,user_location,user_posts',
                return_scopes: true });
        }

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
                $scope.usrSesion.id = "";
                $scope.usrSesion.usuario = "";
                $scope.usrSesion.nombre = "";
                $scope.usrSesion.correo = "";
                $scope.usrSesion.conectado = true;
                $scope.usrSesion.rol = "";
            });
            $scope.logged=false;
            $scope.nombreFacebook="";
            if ($location.path()!='/inicio' && $location.path()!='/mecanica' && $location.path()!='/sobre-la-campana' && $location.path()!='/terminos-y-condiciones') {
                $location.path('/inicio');
            }
        };

        $scope.reloadRoute = function() {
            $route.reload();
        };

        $scope.showView=function (view) {
            $location.path('/'+view+'');

        }
        $scope.openCart= function () {

            if($cookieStore.get('conectado')){

                $location.path('/Carrito');

            }else{
                console.log("Error:: login Required ");
            }

        }
    });
