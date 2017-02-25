'use strict';

/**
 * @ngdoc function
 * @name ecommerceApp.controller:inicioCtrl
 * @description
 * # inicioCtrl
 * Controller of the ecommerceApp
 */
angular.module('ecommerceApp')
  .controller('inicioCtrl', function ($scope,$location, $http) {
       $(function () {
        $(window).ready(function(){
        window.setTimeout(function(){
            if($(window).width() > 768)
        {
                    $('#myModal').modal('show');

        }
          }, 10000);
                });

          $(".footer").show();

            // wait till load event fires so all resources are available
          $(".navbar-custom .navbar-nav a").css({"color":"#fff"});
          $(".nav-icon-normal").show();
          $(".nav-icon-sticky").hide();
          $("#img-white").show();
          $("#img-black").hide();
          $(".navbar-fixed-top").removeClass("top-nav-collapse");
        });
    $scope.verProducto=function (product) {
    $location.path('/'+product+'');

    };

      $scope.usuarioNl = {nombre:'', correo:''};
      $scope.terminosCondiciones = '';
      $scope.registrarNewsletter = function () {
          if ($scope.usuarioNl.correo != '') {
              if ($scope.terminosCondiciones == 'aceptado') {
                  $http({
                      url: 'https://www.creeenlabelleza.com/usuarios-nl/add',
                      dataType: 'json',
                      method: 'POST',
                      data: $scope.usuarioNl
                  })
                      .then(function (request) {
                          if (request.data.success) {
                              console.log('usuario registrado con éxito');
                          } else {
                              console.log('Error al registrar es usuario al newsletter ' + producto.id);
                          }
                      })
                      .finally(function () {


                      });
              }else{
                  console.log('No ha aceptado términos y condiciones');
              }
          }else{
              console.log('No se ha ingresado el correo');
          }
      }



  });
