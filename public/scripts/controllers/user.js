'use strict';

/**
 * @ngdoc function
 * @name ecommerceApp.controller:userCtrl
 * @description
 * # userCtrl
 * Controller of the ecommerceApp
 */
angular.module('ecommerceApp')
  .controller('userCtrl', function ($scope, $http,$cookieStore, server, conexion,$rootScope,Facebook) {

              //  $rootScope.$emit("CallParentMethod", {}); //llamar a una función de otro Controller

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
                    var i=0;
                      request.data.rows.forEach(function(publicacion) {
                        i=i+20;
                          if (publicacion.likes_count == null){
                              publicacion.likes_count = 0;
                          }
                          Facebook.getLoginStatus(function(response) {
                            Facebook.api('/'+publicacion.id_post+"/?fields=likes.summary(1)"
                                ,function(response) {
                                publicacion.likes_count=response.likes.summary.total_count;
                                actualizarLikes(response.likes.summary.total_count,publicacion.id_post,publicacion.id);
                                if (publicacion.codigo_promo != null && publicacion.codigo_promo != '' ){
                                      publicacion.likes_count += 120;
                                }

                                $scope.mode = 'query';
                                $scope.activated = true;

                                    
                                $scope.determinateValue =(publicacion.likes_count*100)/publicacion.likes; //Calcula Porcentaje según likes obtenidos por la meta de likes
                                console.log((publicacion.likes_count*100)/publicacion.likes);
                                $scope.restante_likes=publicacion.likes-publicacion.likes_count;



                                });
                          });
                                



                          

                          


                            


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

          function percentage(num, per){return (num/100)*per;}


function actualizarLikes(likecount,idpost,idpubli) {
  $http({
              url: 'http://localhost:3000/publicaciones/actualizarLikes',
              dataType: 'json',
              method: 'POST',
              data: {likes_count:likecount, id_post:idpost, id:idpubli}
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

}


      $scope.actualizarLikes = function (likecount,idpost,idpubli) {
          $http({
              url: 'http://localhost:3000/publicaciones/actualizarLikes',
              dataType: 'json',
              method: 'POST',
              data: {likes_count:likecount, id_post:idpost, id:idpubli}
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
