'nuse strict';

/**
 * @ngdoc function
 * @name ecommerceApp.controller:indexCtrl
 * @description
 * # indexCtrl
 * Controller of the ecommerceApp
 */
angular.module('ecommerceApp')
    .controller('indexCtrl', function ($scope, $cookieStore, $location, $http, logger, server, conexion) {
        logger.debug('Controller INDEX ');

        //Jquery 
        $(function () {
            
            $("#img-close").mouseover(function(){$(this).rotate({animateTo:180})});
            $("#img-close").mouseout(function(){$(this).rotate({animateTo:-180})});
            $(".footer").hide();
            if ($(window).width() <= 992) {
                alert("yaaa");
                tinysort('.line-home>div',{attr:'title'});
            }else{
                tinysort('.line-home>div',{attr:'accesskey'});
            }
            $("#nav-icon-sticky").hide();
            $(".footer").hide();
            collapseNavbar();
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
          url: 'http://localhost:3000/publicaciones/getUsuario/'+$cookieStore.get('id'),
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
            $location.path('/user');
        };

        //Shared Dialog
        $scope.sharingPost= function  ( ) {
            FB.ui({
                method: 'share',
                hashtag: '#CreeEnlaBelleza',
                quote: 'La belleza tiene un poder inexplicable para tocar el corazón y resaltar las cosas buenas de las personas.',
                display: 'popup',
                mobile_iframe: true,
                href: 'http://oboticario.com.co/malbec/index.php',
            }, function(response){
                console.log(response);

            });
        };

        //Login Facebook
        $scope.FBLogin = function () {
            FB.login(
                function(response) {
                if (response.authResponse) {
                    //get gender an link profile
                    FB.api('/me?fields=id,name,email,birthday,location,link,gender', function(response) {
                        if (response.location) {
                            var localidad=response.location.name;
                        }else{
                            var localidad="No hay localidad";
                        }

                        var email;
                        if (response.location) {
                            email=response.email;
                        }else{
                            email="Not Permission";
                        }
                        console.log(response);
                        var datos=
                            {
                                id:response.id,
                                name:response.name,
                                email:email,
                                location:localidad,
                                gender:response.gender,
                                link:response.link
                            };

                        $http({
                            url: 'http://localhost:3000/users/ValidUserFacebook',
                            dataType: 'json',
                            method: 'POST',
                            data: datos
                        })
                            .then(function (request) {
                                if (request.data.success==true) {
                                    usrASesion(request.data.message[0]);
                                    $scope.logged=true;
                                    $scope.nombreFacebook=datos.name;
                                    consultarCarrito();
                                    if (request.data.repeat==true) {
                                        console.log("Usuario ya se encuentra registrado");
                                    }else{
                                        console.log("nuevo Usuario");
                                    }
                                }else{
                                    console.log("Error");
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
            if ($location.path()!='/inicio' && $location.path()!='/mecanica' && $location.path()!='/sobre-la-campana' && $location.path()!='/terminos-y-condiciones') {
                $location.path('/inicio');
            }
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
