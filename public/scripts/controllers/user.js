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
$(function () {
      function progress(percent, $element) {
                              var progressBarWidth = percent * $element.width() / 100;
                              $element.find('div').animate({ width: progressBarWidth }, 500).html(' <img class="img-progress" src="images/icons/icon-like-tracking.png" Style="margin-top:-25px;"> <h4 style="font-size:20px;padding-right:5px;">'+percent+'</h4>');
                          }
                          $(window).resize(function() {
                          progress(80, $('.progressBar'));
                          });
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
                          $(function () {
                            function progress(percent, $element) {
                              var progressBarWidth = percent * $element.width() / 100;
                              $element.find('div').animate({ width: progressBarWidth }, 500).html(' <img class="img-progress" src="images/icons/icon-like-tracking.png" Style="margin-top:-25px;"> <h4 style="font-size:20px;padding-right:5px;">'+percent+'</h4>');
                          }
                          progress(80, $('.progressBar'));
                          })


                          $scope.restante_likes=publicacion.likes-publicacion.likes_count;
                           /* 
                            FB.api(
                              "/{"+publicacion.id_post+"}",
                              function (response) {
                                if (response && !response.error) {
                                  console.log(response);
                                }
                                  console.log(response);

                              }
                              );*/


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


      $scope.actualizarLikes = function () {
          $http({
              url: 'http://localhost:3000/publicaciones/actualizarLikes',
              dataType: 'json',
              method: 'POST',
              data: {likes_count:0, id_post:null, id:null}
          })
              .then(function (request) {
                  if (request.data.success) {
                      // TODO likes de publicación actualizada con éxito
                  }else{
                      console.log('Error al actualizar likes de la publicacion');
                      $scope.error = 'Error al actualizar likes de la publicacion';

                  }
              })
              .finally(function () {


              });
      };


      	
  });
