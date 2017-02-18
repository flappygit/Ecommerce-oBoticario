'use strict';

/**
 * @ngdoc function
 * @name ecommerceApp.controller:CarritoCtrl
 * @description
 * # CarritoCtrl
 * Controller of the ecommerceApp
 */
angular.module('ecommerceApp')
  .controller('CarritoCtrl', function ($scope, $cookieStore, $location) {
  	$(function () {
      $(".footer").show();

            // wait till load event fires so all resources are available
            $(".nav-icon-normal").hide();
          $(".nav-icon-sticky").show();
             $(".navbar-fixed-top").addClass("top-nav-collapse");
        	 $(".navbar-custom .navbar-nav a").css({"color":"#000"});
        	 $("#img-white").hide();
        	 $("#img-black").show();
        });  	
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
    }else{
    	$location.path("/inicio");
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

  });