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
              layer_13.style.top= -(window.pageYOffset / 100) +'%';


}
window.addEventListener("scroll", parallax, false);


function collapseNavbar() {
    if ($(".navbar").offset().top > 650) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
        $(".navbar-custom .navbar-nav a").css({"color":"#000"});
        $("#img-white").hide();
        $("#img-black").show();
    } else {
        $(".navbar-custom .navbar-nav a").css({"color":"#fff"});

        $("#img-white").show();
        $("#img-black").hide();
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}
              var showRight = document.getElementById( 'showRight' );
              var showRight1 = document.getElementById( 'showRight1' );
              var menuRight = document.getElementById( 'cbp-spmenu-s2' );
                var vd;

              showRight.onclick = function() {
                
                $('body').css('overflow-y','hidden');
                var overlay = jQuery('<div id="overlay"> </div>');
                overlay.appendTo(document.body)
                overlay.appendTo(document.nav)
                classie.toggle( this, 'active' );
                classie.toggle( menuRight, 'cbp-spmenu-open' );
                vd=true;                
              };
              showRight1.onclick = function() {
                
                $('body').css('overflow-y','hidden');
                var overlay = jQuery('<div id="overlay"> </div>');
                overlay.appendTo(document.body)
                overlay.appendTo(document.nav)
                classie.toggle( this, 'active' );
                classie.toggle( menuRight, 'cbp-spmenu-open' );
                vd=true;                
              };



              function cerrar(){
                $("#overlay").remove();
                $('body').css('overflow-y','visible');
                vd=false;
                
                classie.toggle( document.getElementById( 'showRight' ), 'active' );
                classie.toggle( menuRight, 'cbp-spmenu-open' );
              }

              $(window).resize(function() {

              if ($(window).width()  > 960  && vd==true) {
                vd=false;
                $("#overlay").remove();
                $('body').css('overflow-y','visible');

                classie.toggle( document.getElementById( 'showRight' ), 'active' );
                classie.toggle( menuRight, 'cbp-spmenu-open' );
              }
              });
              

$(window).scroll(function() {
 collapseNavbar();
 var wScroll=$(this).scrollTop();
 $(".img-product-lily").css({
    "transform": "translate(0px "+wScroll/2 +"%)"
 })
});
$(document).ready(function () {
    parallax ();
    collapseNavbar();
});



