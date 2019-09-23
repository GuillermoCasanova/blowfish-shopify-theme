
var NavState = (function() {
    
    var makeNavMinimal = function() {

       $('[data-ui-component="main-navigation"]').addClass('main-nav--minimal');

    };


    var makeNavFull = function() {

       $('[data-ui-component="main-navigation"]').removeClass('main-nav--minimal');

    };


    var makeNavAlt = function() {

       $('[data-ui-component="main-navigation"]').addClass('main-nav--alt');  
       $('[data-ui-component="cart-icon"]').addClass('is-alt');
    };


    var makeNavNormal = function() {

       $('[data-ui-component="main-navigation"]').removeClass('main-nav--alt');  
       $('[data-ui-component="cart-icon"]').removeClass('is-alt');

    };

    return NavState = {

      makeNavMinimal: makeNavMinimal,
      makeNavFull: makeNavFull, 
      makeNavAlt: makeNavAlt,
      makeNavNormal: makeNavNormal

    }

})(); 


