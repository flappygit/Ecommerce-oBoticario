'use strict';

/**
 * @ngdoc function
 * @name ecommerceApp.controller:userCtrl
 * @description
 * # userCtrl
 * Controller of the ecommerceApp
 */
angular.module('ecommerceApp')
  .controller('userCtrl', function ($scope, $http,$cookieStore, server, conexion) {

      $http({
          url: 'http://localhost:3000/publicaciones/getPublicadoPorUsuario/'+$cookieStore.get('id'),
          dataType: 'json',
          method: 'GET'
      })
          .then(function (request) {
              if (request.data.success) {
                  if (request.data.code){
                      console.log(request.data.code);
                      request.data.rows.forEach(function(publicacion) {
                          if (publicacion.likes_count == null){
                              $scope.likes_count = 0;
                          }
                          if (publicacion.codigo_promo != null && publicacion.codigo_promo != '' ){
                              publicacion.likes_count += 120;
                          }
                      });
                      $scope.publicaciones = request.data.rows;
                      $scope.error = null;
                  }else {
                      $scope.error = 'No tiene productos publicados';
                      console.log('no tiene productos publicados');
                  }
              }else{
                  console.log('Error al traer los productos publicados');
                  $scope.error = 'Error consultando productos publicados, intentelo más tarde';

              }
          })
          .finally(function () {


          });
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
  });
