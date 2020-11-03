
var NavState = (function() {
    
    var makeNavMinimal = function() {
       $('[data-main-navigation]').addClass('main-nav--minimal');
    };


    var makeNavFull = function() {
       $('[data-main-navigation]').removeClass('main-nav--minimal');
    };


    var makeNavAlt = function() {
       $('[data-main-navigation]').addClass('main-nav--alt');  
       $('[data-cart-icon]').addClass('is-alt');
    };


    var makeNavNormal = function() {
       $('[data-main-navigation]').removeClass('main-nav--alt');  
       $('[data-cart-icon]').removeClass('is-alt');
    };

    return NavState = {
      makeNavMinimal: makeNavMinimal,
      makeNavFull: makeNavFull, 
      makeNavAlt: makeNavAlt,
      makeNavNormal: makeNavNormal
    }

})(); 


