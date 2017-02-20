'use strict';

/**
 * @ngdoc function
 * @name ecommerceApp.controller:pagesCtrl
 * @description
 * # pagesCtrl
 * Controller of the ecommerceApp
 */
angular.module('ecommerceApp')
  .controller('pagesCtrl', function ($scope, $cookieStore, $location, $http, logger, server, conexion) {
  		$(function () {
      $(".footer").show();
      $('html, body').animate({scrollTop: '0px'}, 300);

            // wait till load event fires so all resources are available
            $(".nav-icon-normal").hide();
          $(".nav-icon-sticky").show();
             $(".navbar-fixed-top").addClass("top-nav-collapse");
        	 $(".navbar-custom .navbar-nav a").css({"color":"#000"});
        	 $("#img-white").hide();
        	 $("#img-black").show();
        });  	
  	console.log($location.path());
    if (!$cookieStore.get('conectado')) {
      if ($location.path()!='/inicio') {
        $(function () {
        console.log("running timeout");

          window.setTimeout(function(){
            if($(window).width() > 768)     
        {
                    $('#myModal1').modal('show');

        }
          }, 10000);

        })


      }
    }
  });