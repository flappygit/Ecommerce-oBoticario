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

        $scope.$parent.homevar=false;


        function removeItem ( arr, item ) {

            var a = arr.indexOf( item );

            if ( a !== -1 ) {
                $scope.publicaciones=$scope.publicaciones-1;
                arr.splice( a, 1 );
                if ($scope.publicacion.length==0 ) {
                    $scope.error = 'No tiene productos publicados';

                }else{

                }
            }

        }



        function eliminarpubli(publicacion) {
            $http({
                url: server+'publicaciones/eliminar/'+publicacion.id,
                dataType: 'json',
                method: 'GET'
            })
                .then(function (request) {
                    if (request.data.success) {
                        removeItem($scope.publicaciones, publicacion);
                    }
                })
                .finally(function () {


                });
        }

        $(function () {
            $("#myModal2").modal("hide");
            $(".modal-backdrop").hide();
            $("body").css({'overflow-y':'scroll','width':'100%'});
            $('html, body').animate({scrollTop: '0px'}, 300);

            $(".footer").show();


            // wait till load event fires so all resources are available
            $(".nav-icon-normal").hide();
            $(".nav-icon-sticky").show();
            $(".navbar-fixed-top").addClass("top-nav-collapse");
            $(".navbar-custom .navbar-nav a").css({"color":"#000"});
            $("#img-white").hide();
            $("#img-black").show();
        });

        if ($cookieStore.get('conectado')) {

            $http({
                url: server+'publicaciones/getPublicadoPorUsuario/'+$cookieStore.get('id'),
                dataType: 'json',
                method: 'GET'
            })
                .then(function (request) {
                    if (request.data.success) {
                        if (request.data.code){
                            $scope.values = [];

                            if (request.data.rows!=undefined && request.data.rows!=null) {


                                request.data.rows.forEach(function(publicacion, i) {

                                    if (publicacion.likes_count == null){
                                        publicacion.likes_count = 0;
                                    }


                                    Facebook.getLoginStatus(function(response) {

                                        if (response.status === 'connected') {


                                            var uid = response.authResponse.userID;
                                            var token = response.authResponse.accessToken;
                                            Facebook.api('/'+publicacion.id_post+"/?fields=reactions.summary(1)"
                                                ,function(response) {
                                                    console.log(response);
                                                    if (!response.error) {


                                                        publicacion.index = i;

                                                        var promo= 0;
                                                        if (publicacion.codigo_promo != null && publicacion.codigo_promo != '' ){
                                                            promo = 40;
                                                        }

                                                        if(publicacion.likes_count != response.reactions.summary.total_count) {
                                                            publicacion.likes_count = response.reactions.summary.total_count;
                                                            actualizarLikes(response.reactions.summary.total_count, publicacion.id_post, publicacion.id);
                                                            var likesEnviar = publicacion.likes_count + promo;
                                                            $http({
                                                                url: server+'publicaciones/correos-enviados/enviarcorreover',
                                                                dataType: 'json',
                                                                method: 'POST',
                                                                data:{clave:'400226926995567', usuario:$cookieStore.get('id'), likes:likesEnviar, publicacion:publicacion}
                                                            })
                                                                .then(function (request) {
                                                                    if (request.data.success) {
                                                                        if (request.data.enviado){
                                                                            console.log('correo enviado');
                                                                        }else{
                                                                            console.log('correo No enviado por falta de likes');
                                                                        }
                                                                    }
                                                                    else{
                                                                        console.log(request.data.message);
                                                                    }
                                                                })
                                                                .catch(function (error) {
                                                                    console.log(error);
                                                                });
                                                        }
                                                        publicacion.likes_count += promo;


                                                        $scope.values.push({'countTo':publicacion.likes_count,'countFrom':0,'progressValue':publicacion.likes_count*100/publicacion.likes,'idpost':publicacion.id_post});


                                                    }else{
                                                        eliminarpubli(publicacion);
                                                    }


                                                },{access_token: token});

                                        }else{
                                            Facebook.login(function(responses1) {

                                                Facebook.api('/'+publicacion.id_post+"/?fields=reactions.summary(1)"
                                                    ,function(response) {
                                                        if (!response.error) {


                                                            publicacion.index = i;

                                                            publicacion.likes_count=response.reactions.summary.total_count;

                                                            actualizarLikes(response.reactions.summary.total_count,publicacion.id_post,publicacion.id);

                                                            if (publicacion.codigo_promo != null && publicacion.codigo_promo != '' ){
                                                                publicacion.likes_count += 40;
                                                            }


                                                            $scope.values.push({'countTo':publicacion.likes_count,'countFrom':0,'progressValue':publicacion.likes_count*100/publicacion.likes});
                                                            console.log($scope.values);



                                                            $scope.restante_likes=publicacion.likes-publicacion.likes_count;
                                                        }else{
                                                            eliminarpubli(publicacion);

                                                        }

                                                    });


                                            }, { scope: "user_posts,publish_actions",return_scopes: true });
                                        }

                                    })








                                });

                            }else{
                                console.log("request.rows null or undefined")
                            }

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

        }else{
            $scope.error = 'No tiene productos publicados';
            console.log('no tiene productos publicados');

        }

        function percentage(num, per){return (num/100)*per;}


        function actualizarLikes(likecount,idpost,idpubli) {
            $http({
                url: server+'publicaciones/actualizarLikes',
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
                url: server+'publicaciones/actualizarLikes',
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