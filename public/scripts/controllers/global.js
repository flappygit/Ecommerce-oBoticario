'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:GlobalCtrl
 * @description
 * # GlobalCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('GlobalCtrl', function ($scope, $cookieStore, $location, $route, logger,$http) {
    logger.debug('RUNNING ANGULAR JS');
    $scope.logged=false;
    $scope.error = null;
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

    function usrASesion(usuario) {
      $scope.$watch('usrConectado', function () {
        $scope.usrSesion.idfacebook = usuario.id;
        $scope.usrSesion.nombre = usuario.name;
        $scope.usrSesion.email = usuario.email;
        $scope.usrSesion.rol = "usuario_facebook";
        $scope.usrSesion.location = usuario.location;
        $scope.usrSesion.conectado = true;
      });
      $cookieStore.put('conectado', true);
      $cookieStore.put('usuario', usuario);
      $cookieStore.put('rol', "usuario_facebook");
    }
    

    $scope.FBLogin = function () {
      FB.login(function(response) {
        if (response.authResponse) {
          FB.api('/me?fields=id,name,email,birthday,location', function(response) {
            if (response.location) {
              var localidad=response.location.name;
            }else{
              var localidad="No hay localidad";

            }
            var datos=
            {
              id:response.id,
              name:response.name,
              email:response.email,
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
                usrASesion(datos);
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
      }, {scope: 'email,user_likes,user_photos,user_posts,user_birthday,user_hometown,user_location',
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
      //$location.path('/');
    };

    $scope.reloadRoute = function() {
      $route.reload();
    };
  });
