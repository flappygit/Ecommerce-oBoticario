'use strict';

/**
 * @ngdoc function
 * @name ecommerceApp.controller:CarritoCtrl
 * @description
 * # CarritoCtrl
 * Controller of the ecommerceApp
 */
angular.module('ecommerceApp')
  .controller('CarritoCtrl', function ($scope, $cookieStore, $http,$location){


    $scope.codes = {}; //arreglo para guar
    $scope.TotalLike=0;
    $
  	$(function () {
      $(".footer").show();
      $('html, body').animate({scrollTop: '0px'}, 300);

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
                      console.log(request.data.rows.length);
                      $scope.$parent.productosCarrito=request.data.rows.length;

                      request.data.rows.forEach(function(producto) {
                        $scope.TotalLike= $scope.TotalLike+producto.likes;
                      });

                      $scope.error = null;
                  }else {
                      $scope.error = 'No tiene productos en el carrito';
                      console.log('no tiene productos agregados');
                  }
              }else{
                  console.log('Error al traer los productos');
                  $scope.error = 'Error consultando productos, intentelo más tarde';

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
                      $scope.$parent.productosCarrito=$scope.$parent.productosCarrito-1;
                      $scope.TotalLike=$scope.TotalLike-producto.likes;
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
              if ($scope.productos.length==0 ) {
                      $scope.error = 'No tiene productos en el carrito';

              }else{

              }
          }

      }


      $scope.validarPromo = function (idpublicacion) {
        var usuario_id=$cookieStore.get('id');
        var datos = {usuario_fb:usuario_id, idpublicacion:idpublicacion,codigoDescuento:''};
        console.log($scope.codes); // código de descuento
        console.log(id);
        /*
        //validate code promo
          $http({
              url: '',
              dataType: 'json',
              method: 'GET'
          })
              .then(function (request) {
                  
              })
              .finally(function () {

              });
              */
      };


  });