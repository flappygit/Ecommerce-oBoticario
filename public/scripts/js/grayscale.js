var loaded = 0;
function showprogress() {
if (document.images.length == 0) {
return false;
}

for (var i=0; i<document.images.length; i++) {


loaded++;

}

var percentage = Math.round(
100 * loaded / document.images.length);
alert(percentage);

$(".progress").append(""+
percentage + "%");

if (percentage == 100) {
clearInterval(ID);
}
}



var ID = setInterval(function()
    { 
showprogress();
alert("entraaaa");
    }, 100);




$("div#divLoading").addClass('show');
        $(".navbar").hide();

function collapseNavbar() {
    var pathname = window.location;
    if (pathname!="https://www.creeenlabelleza.com/#/inicio" && pathname!="https://www.creeenlabelleza.com/") {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
        $(".navbar-custom .navbar-nav a").css({"color":"#000"});
        $("#img-white").hide();
        $("#img-black").show();
        $(".nav-icon-normal").hide();
        $(".nav-icon-sticky").show();

    }else{
    if ($(".navbar").offset().top > 650) {

        $(".navbar-fixed-top").addClass("top-nav-collapse");
        $(".navbar-custom .navbar-nav a").css({"color":"#000"});
        $("#img-white").hide();
        $("#img-black").show();

        $(".nav-icon-normal").hide();
        $(".nav-icon-sticky").show();
    } else {
        $(".navbar-custom .navbar-nav a").css({"color":"#fff"});
        $(".nav-icon-normal").show();
        $(".nav-icon-sticky").hide();
        $("#img-white").show();
        $("#img-black").hide();
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }  
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

      $(window).resize(function() {
        var vd=true;
        if ($(window).width() <= 992) {
          tinysort('.line-home>div',{attr:'title'});
        }else{
          tinysort('.line-home>div',{attr:'accesskey'});
        }
      });



