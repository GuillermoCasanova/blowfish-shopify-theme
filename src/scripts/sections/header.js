/**
 * Header Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Header template.
 *
   * @namespace header
 */

theme.Header = (function() {


  var selectors = {
    offCanvasMenu: '[data-off-canvas-menu]',
    offCanvasCart: '[data-off-canvas-cart]',
    offCanvasCartOverlay: '[data-off-canvas-cart-overlay]',
    closeOffCanvasCart: '[data-close-off-canvas-cart]',
    menuToggle: '[data-menu-toggle]',
    menuContainer: '[data-menu]',
    navigation: '[data-main-navigation]',
    cartToggle: '[data-cart-toggle]',
    cartIcon: '[data-cart-icon]',
    dropdownOverlay: '[data-dropdown-overlay]',
    navigationLink: '[data-navigation-link]'
  };

  var $offCanvasMenu = $(selectors.offCanvasMenu);
  var $offCanvasCart = $(selectors.offCanvasCart); 
  var $dropdownOverlay = $(selectors.dropdownOverlay); 
  var $navigation = $(selectors.navigation); 
  var $navigationLinks =  $(selectors.navigationLink); 
  var $offCanvasCartOverlay = $(selectors.offCanvasCartOverlay); 
  var $cartIcon = $(selectors.cartIcon); 
  var $body = $('body');

  var $menuToggle = $(selectors.menuToggle); 
  var menuContainer = $(selectors.menuContainer);
  var menuIsOpen = false; 
  var offCanvasCartOpen = false; 
  var openSection = false; 
  

  /*------------------------------------*\
      #Sticky Main Nav Styles Toggle
  \*------------------------------------*/

  // Variable to detect if user is smooth scrolling to a section
  var smoothScrolling = false; 

  // Checks to see if there is a '[data-action="toggle-top-bar"]' to hide/show
  // This prevents it from activating on small devices. 
  if($('[sticky-nav]').length > 0) {

      //
      // Function checks to see if the user is scrolling, 
      // if they are, 

      (function($){

          var prevScroll = 0;
          var currentScroll; 
          var stickyNavContainer = $('[sticky-nav]');
          var navBar = $(selectors.navigation);
          var cart = $(selectors.cartIcon); 
          var navBarHeight = navBar.height(); 
          var didScroll = false; 
          var theWindow = $(window);


          $(window).scroll(function() {
              didScroll = true;
          });
           
          setInterval(function() {

            if (didScroll) {

              didScroll = false; 

              currentScroll = theWindow.scrollTop();
              
              if(100 < currentScroll) {
                navBar.addClass('main-nav--fixed');  
                navBar.removeClass('main-nav--alt');
              } else {
                navBar.removeClass('main-nav--fixed');
              }

               prevScroll = currentScroll; 

            } 

          }, 300);

      })(jQuery);
  }

  /*------------------------------------*\
      #Nav Styles Toggle Based on page 
  \*------------------------------------*/

  //If the user is on the hangover-science.html page, show the alt styling for the nav and cart
  //  

  var altNavPage = '/pages/hangover-science'; 

  var hideLogoPage = '/'; 

  (function($) {
    console.log(window.location.pathname); 

    if(window.location.pathname === altNavPage) {
     $navigation.addClass('mainNav--alt');
     $cartIcon.addClass('cart--alt'); 
    }

    if(window.location.pathname === hideLogoPage) {
      $navigation.addClass('is-logo-hidden');
    }

  })(jQuery);



  var Header = function(container) {
    
    var that = this; 
    var loadingSection = false; 

    this.$container = $(container); 

    var toggleMenuIcon = function() {
      if($menuToggle.hasClass('is-menu-open')) {
        $menuToggle.removeClass('is-menu-open');
        $menuToggle.addClass('is-menu-closed');
      } else {
        $menuToggle.removeClass('is-menu-closed');
        $menuToggle.addClass('is-menu-open');
      }
    }

    this.toggleNavigation = function()   {

      if($offCanvasMenu.hasClass('is-open')) {
        $offCanvasMenu.removeClass('is-open');
        $offCanvasMenu.addClass('is-closed');
        $menuToggle.removeClass('is-open');
        $menuToggle.addClass('is-closed');
        menuIsOpen = false;    
      } else{
        $offCanvasMenu.addClass('is-open');
        $offCanvasMenu.removeClass('is-closed');
        $menuToggle.addClass('is-open');
        $menuToggle.removeClass('is-closed');
        menuIsOpen = true;    
      }
    }

    //** Toggles the cart, loads it with AJAXCART.JS **//
    this.toggleCart = function() {
      if($offCanvasCart.hasClass('is-open')) {
        $offCanvasCart.removeClass('is-open');
        $offCanvasCart.addClass('is-closed');
        $offCanvasCartOverlay.removeClass('is-showing');
        $offCanvasCartOverlay.addClass('is-hidden');
        offCanvasCartOpen = false;    
      } else{
        ajaxCart.load(); 
        $offCanvasCart.addClass('is-open');
        $offCanvasCart.removeClass('is-closed');
        $offCanvasCartOverlay.addClass('is-showing');
        $offCanvasCartOverlay.removeClass('is-hidden');
        offCanvasCartOpen = true;    
      }
    }

    this.closeCart = function() {
      $offCanvasCart.removeClass('is-open');
      $offCanvasCart.addClass('is-closed');
      $offCanvasCartOverlay.removeClass('is-showing');
      $offCanvasCartOverlay.addClass('is-hidden')
      offCanvasCartOpen = false;    
    }

    this.showOverlay = function() {
      $dropdownOverlay.removeClass('is-hidden');
      $dropdownOverlay.addClass('is-showing');
    }

    this.hideOverlay = function() {
      $dropdownOverlay.removeClass('is-showing');
      $dropdownOverlay.addClass('is-hidden');
    }


    //
    // Sets up transtion-delay on all links for stagger animation effect
    //
    var menuItems = $('.mainNav-animElem');  

    for(var i = 0; i < menuItems.length; i++) {
      var item = menuItems[i]; 
      $(item).css('transition-delay', (.02 * i) + 's');
    }


    //
    // Setup mobile-specific jquery 
    //
    this.mobileNavInit = function() {

      $(selectors.menuToggle).off('click'); 
      
      $(selectors.menuToggle).on('click', function(event) {
        that.toggleNavigation(); 
      }); 

      this.initCart(); 

    }


    //
    // Setup desktop-specific jquery 
    //
    this.desktopNavInit = function() {
      this.initCart(); 
    }

    this.initCart = function() {
      $(selectors.cartToggle).off('click'); 

      $(selectors.cartToggle).on('click', function(event) {
        that.toggleCart(); 
      }); 

      $(selectors.closeOffCanvasCart).on('click', function(event) {
        that.closeCart(); 
      }); 
    }


    //
    // Sets up cart events
    //
    this.cartEventsInit = function() {
      $body.on('ajaxCart.cart-is-empty', function() {
        $cartIcon.removeClass('is-filled'); 
        $cartIcon.addClass('is-empty'); 
      });

       $body.on('ajaxCart.cart-is-filled', function() {
        $cartIcon.removeClass('is-empty'); 
        $cartIcon.addClass('is-filled'); 
      })
    }



    var timerId = null;

    var  throttle  =  function (func, delay) {
      // If setTimeout is already scheduled, no need to do anything
      if (timerId) {
        return
      }

      // Schedule a setTimeout after delay seconds
      timerId  =  setTimeout(function () {
        func()
        
        // Once setTimeout function execution is finished, timerId = undefined so that in <br>
        // the next scroll event function execution can be scheduled by the setTimeout
        timerId  =  undefined;
      }, delay)
    }

    //
    // Inits the nav 
    //
    this.initNav = function() {

      this.cartEventsInit(); 

      var currentBreakpoint = window.getComputedStyle(
          document.querySelector('body'), ':before'
      ).getPropertyValue('content').replace(/"/g, "");

      if(currentBreakpoint == 'medium-up' || currentBreakpoint == 'large-up') {
        that.desktopNavInit(); 
      } else {
        that.mobileNavInit(); 
      } 
    }

     this.initNav(); 

     $(window).on('resize', function() {
        throttle(function() {
          that.initNav(); 
        }, 1000)
     });

  };


  //
  // Open cart global method  
  //
  Header.openCart = function() {
    $offCanvasCart.removeClass('is-closed');
    $offCanvasCart.addClass('is-open');
    $offCanvasCartOverlay.addClass('is-showing');
    $offCanvasCartOverlay.removeClass('is-hidden');
    offCanvasCartOpen = true; 
  }; 

  return Header;

})();





