'use strict';

/**
 * @ngdoc function
 * @name ecommerceApp.controller:indexCtrl
 * @description
 * # indexCtrl
 * Controller of the ecommerceApp
 */
angular.module('ecommerceApp')
    .controller('indexCtrl', function ($scope, $cookieStore, $location, $http, logger, server, conexion, $rootScope,Facebook,$timeout) {
        logger.debug('Controller INDEX ');
        $scope.scrollproduct = function () {
            $(function () {
                    $('html, body').animate({
                        scrollTop: $("#lirio2").offset().top
                    }, 2000)
            })
        }

        $rootScope.$on("CallParentMethod", function(){}); //función para usar en otros controllers
        $scope.homevar=false;
        if ($location.path()=="/inicio") {
        $scope.homevar=true;

        }else{
        $scope.homevar=false;

        }

        //Jquery 
        $(function () {
            $('.dropdown').on('mouseover', function() {
                $(".dropdown-menu").toggleClass("open");
            });
        $('.ancla').click(function(e){
      e.preventDefault();
        var enlace  = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(enlace).offset().top
        }, 1000);
      });
        $(".navbar").hide();
        $("#nav-icon-sticky").hide();
        $(".footer").hide();
        collapseNavbar();
        navbarmobile();
            $("#img-close").mouseover(function(){$(this).rotate({animateTo:180})});
            $("#img-close").mouseout(function(){$(this).rotate({animateTo:-180})});
            $(".footer").hide();
            if ($(window).width() <= 992) {
                tinysort('.line-home>div',{attr:'title'});
            }else{
                tinysort('.line-home>div',{attr:'accesskey'});
            
            }
            
        });
        angular.element(window).ready(function () {

            $(function () {
                $(".progress").html("100 %");
                $("#divLoading").removeClass("show");
                $(".navbar").removeClass("hidden");
                $("#divLoading").hide();
                $(".navbar").show();
            })
        });

        $scope.productosCarrito=0;
        $scope.logged=false;
        $scope.error = null;
        $scope.usrSesion = { idfacebook: '', nombre: '', email: '', rol: '', location: '', conectado: false};

        if($cookieStore.get('conectado')){

            var usuario = $cookieStore.get('usuario');
            $scope.logged=true;
            $scope.nombreFacebook=usuario.nombre_fb;
            $scope.$watch('usrConectado', function () {
                $scope.usrSesion.idfacebook = usuario.id_fb;
                $scope.usrSesion.nombre = usuario.nombre_fb;
                $scope.usrSesion.email = usuario.correo_fb;
                $scope.usrSesion.rol = "usuario_facebook";
                $scope.usrSesion.location = usuario.location_fb;
                $scope.usrSesion.conectado = true;
            });
            consultarCarrito();
        }
        function consultarCarrito() {
            $http({
          url: server+'publicaciones/getUsuario/'+$cookieStore.get('id'),
          dataType: 'json',
          method: 'GET'
      })
          .then(function (request) {
              if (request.data.success) {

                  if (request.data.code){
                      $scope.productosCarrito=request.data.rows.length;
                  }
              }
          })
          .finally(function () {


          });
        }

        function usrASesion(usuario) {


            if($location.path()=="/inicio"){
                $(function () {
                    if ($(".navbar").offset().top > 650) {
                        $(".navbar-custom .navbar-nav a").css({"color":"#000"});
                    }
                });

            }else{
                $(function () {
                    $(".navbar-custom .navbar-nav a").css({"color":"#000"});
                });

            }

            $scope.$watch('usrConectado', function () {
                $scope.usrSesion.idfacebook = usuario.id_fb;
                $scope.usrSesion.nombre = usuario.nombre_fb;
                $scope.usrSesion.email = usuario.correo_fb;
                $scope.usrSesion.rol = "usuario_facebook";
                $scope.usrSesion.location = usuario.location_fb;
                $scope.usrSesion.conectado = true;
            });
            $cookieStore.put('conectado', true);
            $cookieStore.put('usuario', usuario);
            $cookieStore.put('id', usuario.id);
            $cookieStore.put('rol', "usuario_facebook");
        }

        $scope.userPerfil = function () {
            $location.path('/conteo-de-likes');
        };

        


        $scope.openmodalShared= function  ( ) {
            $(function () {
                $(".div-form-shared").show();
                $(".div-message-shared").hide();

                $("#myModalshared").modal("show");
            });
        }





        $scope.sharingPost= function  (estado) {
            
            var privacy={"value":"EVERYONE"};

                        Facebook.login(function(responses1) {

                            Facebook.api('/me/feed',
                                'post',
                                {   
                                    link: server,
                                    privacy: privacy,
                                    message: estado,
                                    picture: "https://creeenlabelleza.com/public/images/Campana.png",
                                    name:"Cree en la Belleza con oBoticário",
                                    description: "#oBoticário ha traído a colombia el primer e-commerce donde el único medio de pago autizados son likes."
                                }
                                ,function(response) {
                                    if (!response || response.error) {
                                        console.log("in error");
                                       console.log(response.error);
                                    } else {
                                        $(function () {
                                            $(".div-form-shared").hide();
                                            $(".div-message-shared").show();
                                        });

                                            $timeout( function () {
                                                $(function () {
                                                    $("#myModalshared").modal("hide");

                                                }); 
                                            },2000);

                                        
                                    }
                                });
                    },{scope: 'user_posts,publish_actions'});

        };




        //Login Facebook
        $scope.FBLogin = function () {
        
            Facebook.login(
                function(response) {
                if (response.authResponse) {



                    //get gender an link profile
                    Facebook.api('/me?fields=id,name,email,birthday,location,link,gender', function(response) {
                        if (response.location) {
                            var localidad=response.location.name;
                        }else{
                            var localidad="No hay localidad";
                        }

                        console.log(response);
                        var datos=
                            {
                                id:response.id,
                                name:response.name,
                                email:response.email,
                                location:localidad,
                                gender:response.gender,
                                link:response.link
                            };

                        console.log(server+'users/ValidUserFacebook');
                        $http({
                            url: server+'users/ValidUserFacebook',
                            dataType: 'json',
                            method: 'POST',
                            data: datos
                        })
                            .then(function (request) {
                                if (request.data.success) {
                                    if (!request.data.repeat){
                                        
                                    }
                                    usrASesion(request.data.message[0]);
                                    $scope.logged=true;
                                $scope.nombreFacebook=  datos.name;
                                    
                                    consultarCarrito();
                                    $(function () {
                                            if ($('#myModal1').is(':visible')) {
                                                $('#myModal1').modal('hide');
                                            }
                                        });
                                    if (request.data.repeat==true) {
                                        if (datos.email && datos.email != null){
                                            //Enviar correo
                                            $http({
                                                url: server+'correos-enviados/enviarcorreofb',
                                                dataType: 'json',
                                                method: 'POST',
                                                data: {correo:3, to:datos.email, nombre:datos.name, clave:'400226926995567'}
                                            })
                                                .then(function (request) {
                                                    if (!request.data.success) {
                                                        console.log("Error, no envio correo");
                                                        console.log(request);
                                                    }
                                                });

                                        }else {
                                            console.log('No tiene correo');
                                        }
                                    }else{
                                        
                                        $(function () {
                                          $("#myModalWelcome").modal("show");
                                        })
                                            
                                    }
                                }else{
                                    console.log("Error");
                                    console.log(request);
                                }
                            })
                            .finally(function () {
                                

                            });


                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }

            }, {scope: 'email,user_posts,publish_actions',
                return_scopes: true });

        };

        $scope.usrSesion = {id: '', usuario: '', correo: '', conectado: '', rol: ''};
        if($cookieStore.get('conectado')!==null && $cookieStore.get('conectado')){
            var usuario = $cookieStore.get('usuario');
            $scope.$watch('usrConectado', function () {
                $scope.usrSesion.id = usuario.id;
                $scope.usrSesion.usuario = usuario.usuario;
                $scope.usrSesion.nombre = usuario.nombre;
                $scope.usrSesion.correo = usuario.correo;
                $scope.usrSesion.conectado = true;
                $scope.usrSesion.rol = usuario.rol;
            });
        }

        $scope.cerrarSesion = function () {
            if($location.path()=="/inicio"){
                $(function () {
                    if ($(".navbar").offset().top > 650) {
                        $(".navbar-custom .navbar-nav a").css({"color":"#000"});
                    }
                });

            }else{
                $(function () {
                    $(".navbar-custom .navbar-nav a").css({"color":"#000"});
                });


            }
            if ($location.path()!='/inicio' && $location.path()!='/mecanica' && $location.path()!='/sobre-cree-en-la-belleza' && $location.path()!='/terminos-y-condiciones') {
                $location.path('/inicio');
            }


                    Facebook.logout(function(response) {
                
                    });

        $cookieStore.remove('conectado');
        $cookieStore.remove('usuario');
        $cookieStore.remove('rol');

        $scope.$watch('usrSesion', function () {
            $scope.usrSesion.id = "";
            $scope.usrSesion.usuario = "";
            $scope.usrSesion.nombre = "";
            $scope.usrSesion.correo = "";
            $scope.usrSesion.conectado = true;
            $scope.usrSesion.rol = "";
        });
        $scope.logged=false;
        $scope.nombreFacebook="";
        $scope.productosCarrito=0;
        };
        
        $scope.reloadRoute = function() {
            $route.reload();
        };

        $scope.showView=function (view) {
            $location.path('/'+view+'');
            $(function () {
                //cerra menú al cambiar la vista
                if (vd==true) {
                    $("#overlay").remove();
                $('body').css('overflow-y','visible');
                vd=false;
                
                classie.toggle( document.getElementById( 'showRight' ), 'active' );
                classie.toggle( menuRight, 'cbp-spmenu-open' );
                };
            })

        };
        $scope.openCart= function () {

            if($cookieStore.get('conectado')){

                $location.path('/Carrito');

            }else{
                console.log("Error:: login Required ");
            }

        };
});
