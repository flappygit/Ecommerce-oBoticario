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


      $scope.descuento = 0;
    $scope.codes = {}; //arreglo para guar
    $scope.TotalLike=0;
    $scope.codigoDescuentoerror=false;
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
                      request.data.rows.forEach(function(producto) {
                          $scope.TotalLike= $scope.TotalLike+producto.likes;
                          if (producto.codigo_promo != null && producto.codigo_promo != '' ){
                              $scope.descuento = 120;
                          }
                      });
                      $scope.productos = request.data.rows;
                      $scope.$parent.productosCarrito=request.data.rows.length;


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
                      $scope.TotalLike=$scope.TotalLike-producto.likes;
                  }else{
                      console.log('Error al eliminar producto '+producto.id);
                  }
              })
              .finally(function () {


              });
      };


      $scope.agregarCodigoPromo = function (producto) {
          $http({
              url: 'http://localhost:3000/publicaciones/validarCodigo',
              dataType: 'json',
              method: 'POST',
              data: {usuario:$cookieStore.get('id'), codigo:producto.codigo_promo, producto:producto.id}
          })
              .then(function (request) {
                  if (request.data.success) {
                      if (request.data.code){
                          console.log('codigo validado');

                      }else {
                          console.log('codigo NO validado');

                      }
                  }
                  else{
                      console.log('Error al validar codigo '+producto.codigo+' del '+producto.id+' y usuario '+$cookieStore.get('id'));
                  }
              })
              .finally(function () {


              });
      };


      function removeItem ( arr, item ) {

          var i = arr.indexOf( item );

          if ( i !== -1 ) {
              $scope.$parent.productosCarrito=$scope.$parent.productosCarrito-1;
              arr.splice( i, 1 );
              if ($scope.productos.length==0 ) {
                      $scope.error = 'No tiene productos en el carrito';

              }else{

              }
          }

      }


        $scope.compartirProducto= function (producto) {

          FB.ui({
            method: 'share',
            hashtag: '#CreeEnlabelleza',
            quote: 'Acumulando likes para ganarme un kit de '+producto.nombre+' de oBoticário',

            //config. content url. opcional
            title: producto.nombre+' - oBoticário',
            picture: 'http://oboticario.com.co/ecommerce/public/'+producto.imagen,
            description: 'Hola amigos, ayúdenme acumulando likes para ganarme un kit de '+producto.nombre +' de oBoticário',

            display: 'popup',
            mobile_iframe: true,
            href: 'http://oboticario.com.co/ecommerce/public/#/inicio',

          }, function(response){
              console.log(response);
                  if (response) {

                      /*
                       $http({
                       url: 'http://localhost:3000/publicaciones/productoPublicado',
                       dataType: 'json',
                       method: 'POST',
                       data: {id_post:'idDePrueba', caption_title:'Caption de prueba', description:'Descripcion de prueba', messages_tags:'Tags del mensaje', id:producto.id}
                       })
                       .then(function (request) {
                       if (request.data.success) {
                       removeItem($scope.productos, producto);
                       $scope.TotalLike=$scope.TotalLike-producto.likes;
                       }else{
                       console.log('Error al Actualizar la publicacion '+producto.id);
                       }
                       })
                       .finally(function () {


                       });
                       */
                  }
          });

        }








  });