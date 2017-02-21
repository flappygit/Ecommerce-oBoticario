'use strict';

/**
 * @ngdoc function
 * @name ecommerceApp.controller:userCtrl
 * @description
 * # userCtrl
 * Controller of the ecommerceApp
 */
angular.module('ecommerceApp')
  .controller('userCtrl', function ($scope, $http,$location, server, conexion) {
    $(function () {
      $(".footer").show();

          function progress(percent, $element) {
            var progressBarWidth = percent * $element.width() / 100;
            $element.find('div').animate({ width: progressBarWidth }, 500).html(' <img class="img-progress" src="images/icons/icon-like-tracking.png" Style="margin-top:-25px;"> <h4 style="font-size:20px;padding-right:5px;">'+percent+'</h4>');
          }

          progress(80, $('#progressBar'));

          $(window).resize(function() {
              progress(80, $('#progressBar'));

          });
            // wait till load event fires so all resources are available
            $(".nav-icon-normal").hide();
          $(".nav-icon-sticky").show();
             $(".navbar-fixed-top").addClass("top-nav-collapse");
        	 $(".navbar-custom .navbar-nav a").css({"color":"#000"});
        	 $("#img-white").hide();
        	 $("#img-black").show();
        });  	
  });
