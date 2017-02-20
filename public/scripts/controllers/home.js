'use strict';

/**
 * @ngdoc function
 * @name ecommerceApp.controller:inicioCtrl
 * @description
 * # inicioCtrl
 * Controller of the ecommerceApp
 */
angular.module('ecommerceApp')
  .controller('inicioCtrl', function ($scope,$location) {
       $(function () {
        $(window).ready(function(){   
        window.setTimeout(function(){
            if($(window).width() > 768)     
        {
                    $('#myModal').modal('show');

        }
          }, 10000);
                }); 

          $(".footer").show();

            // wait till load event fires so all resources are available
          $(".navbar-custom .navbar-nav a").css({"color":"#fff"});
          $(".nav-icon-normal").show();
          $(".nav-icon-sticky").hide();
          $("#img-white").show();
          $("#img-black").hide();
          $(".navbar-fixed-top").removeClass("top-nav-collapse");
        });
    $scope.verProducto=function (product) {
    $location.path('/'+product+''); 
    	
    }
  });
