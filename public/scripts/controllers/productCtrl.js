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
  	console.log("PRODUCTO --->"+$location.path());
  	$(function () {
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

