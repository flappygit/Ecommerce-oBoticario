'use strict';

/**
 * @ngdoc function
 * @name ecommerceApp.controller:productCtrl
 * @description
 * # productCtrl
 * Controller of the ecommerceApp
 */
angular.module('ecommerceApp')
  .controller('productCtrl', function ($scope, $cookieStore, $location, $http, logger, server, conexion) {
    
    $scope.addCart= "Añadir al carrito";
    getpublicacionesPorId();

      function validPubliProduct(url,publicacion) {
        if ( $location.path()==url ) {

              if (publicacion.id_post!=null) {
                    $scope.addCart="COMPRADO";
              }else{
                      $scope.addCart="Añadido al carrito";
              }

          }else{
        }
      }
    function getpublicacionesPorId() {
      $http({
                  url: 'http://localhost:3000/publicaciones/getPublicadoPorUsuario/'+$cookieStore.get('id'),
                  dataType: 'json',
                  method: 'GET'
              })
                  .then(function (request) {
                      if (request.data.success) {
                        console.log(request.data);
                        request.data.rows.forEach(function (publicacion,i) {

                          switch (publicacion.producto){

                            case 1:
                            validPubliProduct("/perfume-Lily",publicacion);
                            break;

                            case 2:
                            validPubliProduct("/labial-Make-B",publicacion);
                            break;

                            case 3:
                            validPubliProduct("/Nativa-Spa",publicacion);
                            break;

                            case 4:
                            validPubliProduct("/Malbec",publicacion);
                            break;

                            default:
                            console.error('producto no consultado');
                            break;
          }
                          
                          
                        })
                        
                          
                      }else{
                          console.log('Error consultando productos');
                      }
                  })
                  .finally(function () {


                  });
    }

      $scope.anadirProducto = function (producto) {
          var verificado = true;
          var usuario_id=$cookieStore.get('id');
          var datos = {usuario_fb:usuario_id, producto:0};
          switch (producto){

              case 'nativa':
                  datos = {usuario_fb:usuario_id, producto:3};
                  break;

              case 'lily':
                  datos = {usuario_fb:usuario_id, producto:1};
                  break;

              case 'makeB':
                  datos = {usuario_fb:usuario_id, producto:2};
                  break;

              case 'malbec':
                  datos = {usuario_fb:usuario_id, producto:4};
                  break;

              default:
                  console.error('Producto enviado no valido en la funcion anadirProducto');
                  verificado = false;
                  break;
          }

          if (verificado){
              $http({
                  url: 'http://localhost:3000/publicaciones/addCarrito',
                  dataType: 'json',
                  method: 'POST',
                  data: datos
              })
                  .then(function (request) {
                      if (request.data.success) {
                          if (request.data.existente){
                              console.log('El usuario ya tiene agregado el producto: ' + datos.producto);
                          }else {
                            $scope.$parent.productosCarrito=$scope.$parent.productosCarrito+1;
                            $scope.addCart="Añadido al Carrito";
                              console.log('producto: ' + datos.producto + ' agregado al usuario: ' + datos.usuario_fb);
                          }
                      }else{
                          console.log('Error agregando al carrito producto: '+datos.producto+' con usuario: '+datos.usuario_fb);
                      }
                  })
                  .finally(function () {


                  });
          }

      };

  	$(function () {
      $(".footer").show();

      var $overlay = $('<div class="overlay"></div>');

$('a[href*="https://www.youtube.com/"]').click( function(e) {

  e.preventDefault();

  // get video id from href (assumes v is last url param)
  var href = $(this).attr('href');
  var vidId = href.substring( href.length - 11, href.length );

  // iframe embed
  var $iframe = $('<div class="flexy"><iframe src="//youtube.com/embed/'+vidId+'?rel=0&autoplay=1" frameborder="0"></iframe></div>');


  // append modal content
  $('body').append($overlay);
  $overlay.append($iframe);

  $('.navbar-fixed-top').hide();
  $('body').css({'overflow-y':'hidden','height':'100%'});

  $('a[href*="https://www.youtube.com/"]').each( function(value) {
      $iframe.append(value);
  });
  
});

$overlay.click( function() {
  $('.navbar-fixed-top').show();
  $('body').css({'overflow-y':'scroll'});

  $(this).detach().empty();
});




      $('html, body').animate({scrollTop: '0px'}, 300);
            // wait till load event fires so all resources are available
            $(".nav-icon-normal").hide();
          $(".nav-icon-sticky").show();
             $(".navbar-fixed-top").addClass("top-nav-collapse");
        	 $(".navbar-custom .navbar-nav a").css({"color":"#000"});
        	 $("#img-white").hide();
        	 $("#img-black").show();
        });

      $(document).ready(function() {


        if (Modernizr.touch) {
            // show the close overlay button
            $(".close-overlay").removeClass("hidden");
            // handle the adding of hover class when clicked
            $(".thumbnail").click(function(e){
                if (!$(this).hasClass("hover")) {
                    $(this).addClass("hover");
                }
            });
            // handle the closing of the overlay
            $(".close-overlay").click(function(e){
                e.preventDefault();
                e.stopPropagation();
                if ($(this).closest(".img").hasClass("hover")) {
                    $(this).closest(".img").removeClass("hover");
                }
            });
        } else {
            // handle the mouseenter functionality
            $(".thumbnail").mouseenter(function(){
                $(this).addClass("hover");
            })
            // handle the mouseleave functionality
            .mouseleave(function(){
                $(this).removeClass("hover");
            });
        }
 
        $('#myCarousel').carousel({
                interval: 2800
        });
 
        $('#carousel-text').html($('#slide-content-0').html());
 
        //Handles the carousel thumbnails
       $('[id^=carousel-selector-]').click( function(){
            var id = this.id.substr(this.id.lastIndexOf("-") + 1);
            var id = parseInt(id);
            $('#myCarousel').carousel(id);
        });
 
 
        // When the carousel slides, auto update the text
        $('#myCarousel').on('slid.bs.carousel', function (e) {
                 var id = $('.item.active').data('slide-number');
                $('#carousel-text').html($('#slide-content-'+id).html());
        });
});
          	  	
  });

