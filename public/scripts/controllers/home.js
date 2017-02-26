'use strict';

/**
 * @ngdoc function
 * @name ecommerceApp.controller:inicioCtrl
 * @description
 * # inicioCtrl
 * Controller of the ecommerceApp
 */
angular.module('ecommerceApp')
  .controller('inicioCtrl', function ($scope,$location, $http) {
       

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


  angular.element(window).ready(function () {

    if ($location.path()=="/inicio") {

          if (angular.element(window).width()>1090) {
            parallax ();

          }

        angular.element(window).setTimeout(function(){
            if(angular.element(window).width() > 768)
        {
                    $('#myModal').modal('show');

        }
          }, 60000);
     }
  });





    $(function () {





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

    };


      $scope.usuarioNl = {nombre:'', correo:''};
      $scope.terminosCondiciones = '';
      $scope.registrarNewsletter = function () {
          if ($scope.usuarioNl.correo != '') {
              if ($scope.terminosCondiciones == 'aceptado') {
                  $http({
                      url: 'https://www.creeenlabelleza.com/usuarios-nl/add',
                      dataType: 'json',
                      method: 'POST',
                      data: $scope.usuarioNl
                  })
                      .then(function (request) {
                          if (request.data.success) {
                              console.log('usuario registrado con éxito');
                          } else {
                              console.log('Error al registrar es usuario al newsletter ' + producto.id);
                          }
                      })
                      .finally(function () {


                      });
              }else{
                  console.log('No ha aceptado términos y condiciones');
              }
          }else{
              console.log('No se ha ingresado el correo');
          }
      }



  });
