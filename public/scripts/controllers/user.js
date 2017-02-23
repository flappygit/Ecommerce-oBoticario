'use strict';

/**
 * @ngdoc function
 * @name ecommerceApp.controller:userCtrl
 * @description
 * # userCtrl
 * Controller of the ecommerceApp
 */
angular.module('ecommerceApp')
  .controller('userCtrl', function ($scope, $http,$cookieStore, server, conexion,$rootScope,Facebook,$timeout) {
              //  $rootScope.$emit("CallParentMethod", {}); //llamar a una función de otro Controller

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
          url: 'http://localhost:3000/publicaciones/getPublicadoPorUsuario/'+$cookieStore.get('id'),
          dataType: 'json',
          method: 'GET'
      })
          .then(function (request) {
              if (request.data.success) {
                  if (request.data.code){
                    $scope.values = [];

                      request.data.rows.forEach(function(publicacion, i) {
                        
                          if (publicacion.likes_count == null){
                              publicacion.likes_count = 0;
                          }
                          Facebook.getLoginStatus(function(response) {
                            Facebook.api('/'+publicacion.id_post+"/?fields=reactions.summary(1)"
                                ,function(response) {
                                  console.log(i);

                                     publicacion.index = i;

                                publicacion.likes_count=response.reactions.summary.total_count;

                                actualizarLikes(response.reactions.summary.total_count,publicacion.id_post,publicacion.id);

                                if (publicacion.codigo_promo != null && publicacion.codigo_promo != '' ){
                                      publicacion.likes_count += 130;
                                }


                                $scope.values.push({'countTo':publicacion.likes_count,'countFrom':0,'progressValue':publicacion.likes_count*100/publicacion.likes});
                                console.log($scope.values);



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
