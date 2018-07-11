
$(window).scroll(function() {
  var isMobile = window.matchMedia("only screen and (max-width: 850px)").matches ||
                  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  var isOtherMediaQuery = window.matchMedia("only screen and (min-width:1080px)").matches;
  if(isMobile && !isOtherMediaQuery) {
   // some code..
 } else {
   var hT = $('#menu').offset().top,
       hH = $('#menu').outerHeight(),
       wH = $(window).height(),
       wS = $(this).scrollTop();

   if (wS > (hT+hH-wH)){
     $('#footer').addClass("menu-footer");
     $('#footer').removeClass("hero-footer");
   } else {
     $('#footer').addClass("hero-footer");
     $('#footer').removeClass("menu-footer");
   }
 }
});
