'use strict';

/**
 * @ngdoc function
 * @name ecommerceApp.controller:inicioCtrl
 * @description
 * # inicioCtrl
 * Controller of the ecommerceApp
 */
angular.module('ecommerceApp')
    .controller('inicioCtrl', function ($scope,$location, $http, server) {
        $scope.errorEmail=false;
        $scope.errorTerminos=false;
        $scope.$parent.homevar=true;

        function parallax () {
            var layer_1= document.getElementById('lirio1');
            var layer_2= document.getElementById('lirio2');
            var layer_8= document.getElementById('lirio3');

            var layer_3= document.getElementById('pintura1');
            var layer_4= document.getElementById('pintura2');
            var layer_6= document.getElementById('pintura3');

            var layer_12= document.getElementById('nativa1');
            var layer_13= document.getElementById('nativa2');
            var layer_14= document.getElementById('nativa3');

            var layer_7= document.getElementById('img-product-lily');
            var layer_9= document.getElementById('img-product-make-b');
            var layer_10= document.getElementById('img-product-nativa');
            var layer_11= document.getElementById('img-product-malbec');


            //aplicando possición
            layer_1.style.top= -(window.pageYOffset / 20) +'%';
            layer_2.style.top= -(window.pageYOffset / 300) +'%';
            layer_3.style.top= -(window.pageYOffset / 2) +'px';
            layer_4.style.bottom= +(window.pageYOffset /2) +'px';
            layer_6.style.top= -(window.pageYOffset /14) +'px';
            layer_7.style.bottom= +(window.pageYOffset /35) +'%';
            layer_9.style.bottom= +(window.pageYOffset /15) +'%';
            layer_10.style.bottom= +(window.pageYOffset /15) +'%';
            layer_11.style.bottom= +(window.pageYOffset /15) +'%';
            layer_8.style.bottom= +(window.pageYOffset /60) +'%';

            layer_12.style.bottom= +(window.pageYOffset /15) +'%';
            layer_13.style.top= -(window.pageYOffset / 3) +'px';


        }
        angular.element(window).scroll(function () {

            if ($location.path()=="/inicio") {
                if (angular.element(window).width()>992) {
                    parallax ();

                }

            }
        });

        angular.element(window).ready(function () {
            $("html,body").css({"width":"100%"});
            $(function () {
                if ($(window).width() <= 992) {
                    tinysort('.line-home>div',{attr:'title'});
                }else{
                    tinysort('.line-home>div',{attr:'accesskey'});
                }
            })

            if ($location.path()=="/inicio") {


          if (angular.element(window).width()>992) {
            parallax ();
            
          }
          
          $(function () {
            window.setTimeout(function(){
                    $('#myModal').modal('show');

                    }, 30000);

                })

            }
        });





        $(function () {





            $(".footer").show();

            // wait till load event fires so all resources are available
            $(".navbar-custom .navbar-nav a").css({"color":"#fff"});
            $(".nav-icon-normal").hide();
            $(".nav-icon-sticky").show();
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
            $("#myModal").modal("hide");
            $(".modal-backdrop").hide();
            $("body").css({'overflow-y':'scroll','width':'100%'});
        });
        $scope.verProducto=function (product) {
            $location.path('/'+product+'');

        };


        $scope.usuarioNl = {nombre:'', correo:''};
        $scope.terminosCondiciones = '';
        $scope.correoRegistrado = false;

        $scope.registrarNewsletter = function (correo) {
            $scope.correoRegistrado = false;
            $(function () {
                $(".btnsubmitnew").css({"background":"#ff9796"});

                $(".btnsubmitnew").text("Enviando ...");
            });
            if (/(.+)@(.+){2,}\.(.+){2,}/.test(correo)) {
                if ($scope.terminosCondiciones == 'aceptado') {
                    $http({
                        url: server+'usuarios-nl/add',
                        dataType: 'json',
                        method: 'POST',
                        data: $scope.usuarioNl
                    })
                        .then(function (request) {
                            if (request.data.success) {
                                //Enviar correo
                                $http({
                                    url: server+'correos-enviados/enviarcorreonl',
                                    dataType: 'json',
                                    method: 'POST',
                                    data: {correo:1, usuario:{nombre:$scope.usuarioNl.nombre, to:$scope.usuarioNl.correo}, clave:'400226926995567', nl:request.data.message.insertId}
                                })
                                    .then(function (request) {
                                        if (!request.data.success) {
                                            console.log("no envio correo");
                                            console.log(request);
                                        }else {
                                            console.log('usuario registrado con éxito');
                                            $scope.errorEmail=false;
                                            $scope.errorTerminos=false;
                                            $scope.usuarioNl.correo="";
                                            $scope.usuarioNl.name="";

                                            $(function () {
                                                $(".btnsubmitnew").css({"background":"#e53936"});
                                                $(".btnsubmitnew").text("¡Suscrito!");
                                                window.setTimeout(function(){
                                                    $('#myModal').modal("hide");

                                                }, 200);
                                            })
                                        }
                                    })
                                    .catch(function (error) {
                                        console.log('Error, No se envio el correo');
                                        console.log(error);
                                    });
                            } else {

                                console.log(request);
                                $(function () {
                                    $(".btnsubmitnew").css({"background":"#e53936"});
                                    $(".btnsubmitnew").text("Suscribirme");
                                });
                                if (request.data.message.errno == 1062){
                                    console.log('Correo ya ha sido registrado');
                                    $scope.correoRegistrado = true;
                                }else{
                                    console.log(request);
                                    console.log('Error al registrar el usuario al newsletter ');
                                }
                            }
                        }).catch(function (err) {

                            console.log('no se registro el usuario');
                            console.log(err);

                        }).finally(function () {


                        });



                }else{
                    $(function () {


                        $(".btnsubmitnew").css({"background":"#e53936"})
                        $(".btnsubmitnew").text("Acepte Términos y condiciones");
                        window.setTimeout(function(){
                            $(".btnsubmitnew").text("Suscribirme");

                        }, 2000);
                    })
                    $scope.errorEmail=false;
                    $scope.errorTerminos=true;
                    console.log('No ha aceptado términos y condiciones');
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
