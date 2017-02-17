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

  	console.log("PRODUCTO --->"+$location.path());
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
        $scope.compartirProducto= function (product,description,url) {
            FB.ui({
          method: 'share',
          hashtag: '#CreeEnlabelleza'+'#oBoticário',
          quote: product+' '+description,
          display: 'popup',
          mobile_iframe: true,
          href: url,
        }, function(response){
          console.log(response);

        });
        }  	  	
  });

