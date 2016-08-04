$(document).ready(function(){  
$(window).scroll(function(){
    var sliderH,scrollT;
      sliderH = 50;
      scrollT = $(document).scrollTop();
      if(scrollT >= sliderH){
        $('.nav-top').addClass('fixed');
      }
      else{        
        $('.nav-top').removeClass('fixed');
      }
    });

})