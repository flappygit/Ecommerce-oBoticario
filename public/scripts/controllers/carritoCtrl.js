'use strict';

/**
 * @ngdoc function
 * @name ecommerceApp.controller:CarritoCtrl
 * @description
 * # CarritoCtrl
 * Controller of the ecommerceApp
 */
angular.module('ecommerceApp')
  .controller('CarritoCtrl', function ($scope, $cookieStore, $http,$location,Facebook, server){



 

    $scope.descuento = 0;
    $scope.Compartidos=false;
    $scope.codes = {}; //arreglo para guar
    $scope.TotalLike=0;
    $scope.codigoDescuentoerror=false;
    $scope.errorCompartidos=false;
    $scope.errorEmail=false;
    $scope.errorTerminos=false;
    $scope.successRegister=false;

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
          url: server+'publicaciones/getUsuario/'+$cookieStore.get('id'),
          dataType: 'json',
          method: 'GET'
      })
          .then(function (request) {
              if (request.data.success) {
                  if (request.data.code){
                    if (request.data.rows!=undefined && request.data.rows!=null) {

                    
                      request.data.rows.forEach(function(producto) {
                          $scope.TotalLike= $scope.TotalLike+producto.likes;
                            if (producto.codigo_promo != null && producto.codigo_promo != '' ){
                              $scope.descuento = 40;
                              $scope.successRegister=true;

                          }
                      });
                    }else{
                      console.log("request.data.rows is null or undefined");
                    }

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
              url: server+'publicaciones/eliminar/'+producto.id,
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
              url: server+'publicaciones/validarCodigo',
              dataType: 'json',
              method: 'POST',
              data: {usuario:$cookieStore.get('id'), codigo:producto.codigo_promo, producto:producto.id}
          })
              .then(function (request) {
                  if (request.data.success) {
                      if (request.data.code){
                          $scope.descuento=scope.descuento+40;
                          $scope.successRegister=true;

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

          var estado=producto.estadoFacebook;
          var imagen=producto.imagen;
          var nombre=producto.nombre;
                  Facebook.login(function(responses1) {
                  var privacy={"value":"EVERYONE"};
                            Facebook.api('/me/feed',
                                'post',
                                {   message: estado,
                                    link: "https://creeenlabelleza.com/",
                                    picture: "https://creeenlabelleza.com/public/"+imagen,
                                    description: "Hola amigos, ayúdenme acumulando likes para ganarme un kit de " + nombre +" de oBoticário.",
                                    privacy: privacy,
                                    caption:"#CreeEnLaBelleza"

                                }
                                ,function(response) {
                                    if (!response || response.error) {
                                              $scope.Compartidos=false;
                                              $scope.errorCompartidos=true;
                                        console.log("in error");
                                       console.log(response.error);
                                    } else {
                                        console.log(response);
                                        $http({
                                            url: server+'publicaciones/productoPublicado',
                                            dataType: 'json',
                                            method: 'POST',
                                            data: {id_post:response.id, caption_title:'', description:'', messages_tags:'', id:producto.id}
                                            })
                                            .then(function (request) {
                                            if (request.data.success) {
                                              $scope.errorCompartidos=false;
                                              removeItem($scope.productos, producto);
                                              $scope.TotalLike=$scope.TotalLike-producto.likes;
                                              $scope.Compartidos=true;

                                            }else{
                                              $scope.Compartidos=false;
                                              $scope.errorCompartidos=true;

                                            console.log('Error al Actualizar la publicacion '+producto.id);
                                            }
                                            })
                                            .finally(function () {
                                              
                      
                                            });

                                    }
                                });
                    }, { scope: "user_posts,publish_actions",return_scopes: true });
              
        }

        

        $scope.pathtraking= function () {
          $(function () {
            $("#myModal2").modal("hide");
          })
          $location.path('/user')
        }




 $scope.usuarioNl = {nombre:'', correo:''};
      $scope.terminosCondiciones = '';
      
      $scope.registrarNewsletter = function (correo) {

            $(function () {
              $(".btnsubmitnew").css({"background":"#ff9796"})
              $(".btnsubmitnew").text("Enviando ...")
            })
          if (correo != '') {
              if ($scope.terminosCondiciones == 'aceptado') {
                  $http({
                      url: server+'usuarios-nl/add',
                      dataType: 'json',
                      method: 'POST',
                      data: $scope.usuarioNl
                  })
                      .then(function (request) {
                          if (request.data.success) {
                              console.log('usuario registrado con éxito');
                              $scope.errorEmail=false;
                              $scope.errorTerminos=false;
                              $scope.usuarioNl.correo="";
                              $scope.usuarioNl.name="";

                              $(function () {
                            $(".btnsubmitnew").css({"background":"#e53936"});
                            $(".btnsubmitnew").text("¡Suscrito!");
                          })
                          } else {
                            $(function () {
                                $(".btnsubmitnew").css({"background":"#e53936"})
                                $(".btnsubmitnew").text("Suscribirme");
                            })
                              console.log('Error al registrar es usuario al newsletter ' + producto.id);
                          }
                      })
                      .finally(function () {


                      });
              }else{
                $scope.errorEmail=false;
                $scope.errorTerminos=true;
                $scope.usuarioNl.correo="";
                  console.log('No ha aceptado términos y condiciones');
                  $(function () {
                                $(".btnsubmitnew").css({"background":"#e53936"})
                                $(".btnsubmitnew").text("Acepte Términos y condiciones");
                                window.setTimeout(function(){
                                $(".btnsubmitnew").text("Suscribirme");

                                }, 2000);
                            })
              }
          }else{
            $(function () {
                                $(".btnsubmitnew").css({"background":"#e53936"})
                                $(".btnsubmitnew").text("Suscribirme");
                            })  
              console.log('No se ha ingresado el correo');
              $scope.errorEmail=true;
                $scope.errorTerminos=false;
          }
      }







  });