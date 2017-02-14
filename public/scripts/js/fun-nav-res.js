              var showRight = document.getElementById( 'showRight' );
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