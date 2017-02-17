'use strict';

/**
 * @ngdoc function
 * @name ecommerceApp.controller:CarritoCtrl
 * @description
 * # CarritoCtrl
 * Controller of the ecommerceApp
 */
angular.module('ecommerceApp')
  .controller('CarritoCtrl', function ($scope, $cookieStore, $http) {
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


      $http({
          url: 'http://localhost:3000/publicaciones/getUsuario/'+$cookieStore.get('id'),
          dataType: 'json',
          method: 'GET'
      })
          .then(function (request) {
              if (request.data.success) {
                  if (request.data.code){
                      console.log(request.data);
                      $scope.productos = request.data.rows;
                      $scope.error = null;
                  }else {
                      $scope.error = 'No tiene productos en el carrito';
                      console.log('no tiene productos agregados');
                  }
              }else{
                  console.log('Error al traer los productos');
              }
          })
          .finally(function () {


          });

      $scope.eliminarProducto = function (producto) {
          $http({
              url: 'http://localhost:3000/publicaciones/eliminar/'+producto.id,
              dataType: 'json',
              method: 'GET'
          })
              .then(function (request) {
                  if (request.data.success) {
                      removeItem($scope.productos, producto);
                  }else{
                      console.log('Error al eliminar producto '+producto_id);
                  }
              })
              .finally(function () {


              });
      };


      function removeItem ( arr, item ) {
          var i = arr.indexOf( item );

          if ( i !== -1 ) {
              arr.splice( i, 1 );
          }
      }

  });