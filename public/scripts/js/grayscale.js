




$("div#divLoading").addClass('show');
    $(".navbar").hide();

function navbarmobile() {
    var pathname = window.location;

    if (pathname=="https://www.creeenlabelleza.com/#/inicio") {
      if ($(window).width()<992) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
        $(".navbar-custom .navbar-nav a").css({"color":"#000"});
  
        $("#img-black").show();
        $(".nav-icon-sticky").show();        
      }else{
        if ($(".navbar").offset().top > 650) {

        $(".navbar-fixed-top").addClass("top-nav-collapse");
        $(".navbar-custom .navbar-nav a").css({"color":"#000"});
  
        $("#img-black").show();
        $(".nav-icon-sticky").show();
    } else {
        $(".navbar-custom .navbar-nav a").css({"color":"#000"});
        $(".nav-icon-sticky").show();
        $("#img-black").show();
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }  
      }
    }
}


function collapseNavbar() {
    var pathname = window.location;
    if (pathname!="https://www.creeenlabelleza.com/#/inicio" && pathname!="https://www.creeenlabelleza.com/") {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
        $(".navbar-custom .navbar-nav a").css({"color":"#000"});
        $("#img-black").show();
        $(".nav-icon-normal").hide();
        $(".nav-icon-sticky").show();

    }else{
    if ($(".navbar").offset().top > 650) {

        $(".navbar-fixed-top").addClass("top-nav-collapse");
        $(".navbar-custom .navbar-nav a").css({"color":"#000"});
  
        $("#img-black").show();
        $(".nav-icon-sticky").show();
    } else {
      if ($(window).width()>992) {
        $(".navbar-custom .navbar-nav a").css({"color":"#000"});
        $(".nav-icon-sticky").show();
        $("#img-black").show();
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
      }else{
        $(".navbar-fixed-top").addClass("top-nav-collapse");
        $(".navbar-custom .navbar-nav a").css({"color":"#000"});
  
        $("#img-black").show();
        $(".nav-icon-sticky").show();
      }

        
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
 
});

      $(window).resize(function() {
        navbarmobile();
        var vd=true;
        if ($(window).width() <= 992) {
          tinysort('.line-home>div',{attr:'title'});
          
        }else{
          tinysort('.line-home>div',{attr:'accesskey'});
        }
      });



