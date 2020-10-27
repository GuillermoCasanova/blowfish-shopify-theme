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
    closeOffCanvasCart: '[data-close-off-canvas-cart]',
    menuToggle: '[data-menu-toggle]',
    dropDownToggle: '[data-drop-down-toggle]',
    menuContainer: '[data-menu]',
    navigation: '[data-navigation]',
    cartToggle: '[data-cart-toggle]',
    cartItemAddedSuccessModal: '[data-cart-item-added-success-modal]',
    dropdownOverlay: '[data-dropdown-overlay]',
    navigationLink: '[data-navigation-link]'
  };

   var offCanvasMenu = $(selectors.offCanvasMenu);
   var $offCanvasCart = $(selectors.offCanvasCart); 
   var $dropdownOverlay = $(selectors.dropdownOverlay); 
   var $navigation = $(selectors.navigation); 
   var $navigationLinks =  $(selectors.navigationLink); 

  var menuToggle = $(selectors.menuToggle); 
  var menuContainer = $(selectors.menuContainer);
  var menuIsOpen = false; 
  var offCanvasCartOpen = false; 
  var openSection = false; 
  

  var Header = function(container) {

    var that = this; 
    this.$container = $(container); 

    //this.template = $container.attr('data-template');
    var loadingSection = false; 

    var toggleMenuIcon = function() {
      if(menuToggle.hasClass('is-menu-open')) {
        menuToggle.removeClass('is-menu-open');
        menuToggle.addClass('is-menu-closed');
      } else {
        menuToggle.removeClass('is-menu-closed');
        menuToggle.addClass('is-menu-open');
      }
    }

    this.toggleNavigation = function()   {

      if(offCanvasMenu.hasClass('is-open')) {
        offCanvasMenu.removeClass('is-open');
        offCanvasMenu.addClass('is-closed');
        menuToggle.removeClass('is-open');
        menuToggle.addClass('is-closed');
        menuIsOpen = false;    
      } else{
        offCanvasMenu.addClass('is-open');
        offCanvasMenu.removeClass('is-closed');
        menuToggle.addClass('is-open');
        menuToggle.removeClass('is-closed');
        menuIsOpen = true;    
      }
    }

    //** Toggles the cart, loads it with AJAXCART.JS **//
    this.toggleCart = function() {
      if($offCanvasCart.hasClass('is-open')) {
        $offCanvasCart.removeClass('is-open');
        $offCanvasCart.addClass('is-closed');
        offCanvasCartOpen = false;    
      } else{
        $offCanvasCart.addClass('is-open');
        $offCanvasCart.removeClass('is-closed');
        ajaxCart.load(); 
        offCanvasCartOpen = true;    
      }
    }

    this.closeCart = function() {
      $offCanvasCart.removeClass('is-open');
      $offCanvasCart.addClass('is-closed');
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
    // Setup jquery that applies to all devices
    //
    // this.globalNavPropInit = function() {

    //   $navigationLinks.mouseover(function() {
    //     var handle = $(event.target).data('navigation-handle');
    //     console.log(handle); 
    //     event.preventDefault(); 


    //     $('[data-navigation-link]').each(function() {
    //       if(!$(this).hasClass('is-opaqued') && $(this).data('navigation-handle') !== handle) {
    //         $(this).addClass('is-opaqued');
    //       }
    //     });

    //     // if($('[data-navigation-handle=' + handle + ']').hasClass('is-opaqued')) {
    //     //   $('[data-navigation-handle=' + handle + ']').removeClass('is-opaqued');
    //     // } else {
    //     //   $('[data-navigation-handle=' + handle + ']').addClass('is-opaqued');
    //     // }
    //   });

    //   $navigationLinks.mouseout(function() {
    //     event.preventDefault(); 
    //     $('[data-navigation-link]').removeClass('is-opaqued');
    //   });

    // }

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

      $(selectors.menuToggle).on('click', function(event) {
        that.toggleNavigation(); 
      }); 

      $(selectors.cartToggle).on('click', function(event) {
        that.toggleCart(); 
      }); 

      $(selectors.closeOffCanvasCart).on('click', function(event) {
        that.closeCart(); 
      }); 

    }


    //
    // Setup desktop-specific jquery 
    //
    this.desktopNavInit = function() {

      $(selectors.cartToggle).on('click', function(event) {
        that.toggleCart(); 
      }); 

      $(selectors.closeOffCanvasCart).on('click', function(event) {
        that.closeCart(); 
      }); 


      $('.navigation-menu__drop-down').each(function(index, element) {

          var timer; 
          var dropDownHovered = false; 
          var $dropDownParent = $(element); 

          $dropDownParent.hover(function() {
            dropDownHovered = true; 
             clearTimeout(timer); 
          }, function(event) {
             dropDownHovered = false; 
             timer = setTimeout(function() {
               $dropDownParent.removeClass('is-open');
             }, 100); 
          }); 

          $(element).find(selectors.dropDownToggle).hover(function(event) {
             $dropDownParent.addClass('is-open');
             clearTimeout(timer); 
          }, function(event) {
             timer = setTimeout(function() {
              if(dropDownHovered) {
                $(event.target).parent('[data-dropdown-id]').addClass('is-open');
              } else {
                $(event.target).parent('[data-dropdown-id]').removeClass('is-open');
              }
             }, 100); 
          }); 


          $(element).find('.navigation-menu__drop-down__links').mouseout(function(event) {
              if(dropDownHovered) {
                $(event.target).parent('[data-dropdown-id]').addClass('is-open');
              } else {
                $(event.target).parent('[data-dropdown-id]').removeClass('is-open');
              }
          });

      });



      $(selectors.dropDownToggle).focus(function(event) {

        var id = $(event.target).data('toggle-id');

        $(this).parent('[data-dropdown-id]').addClass('is-open');

        $('[data-dropdown-id]').each(function() {
          if($(this).hasClass('is-open') && $(this).data('dropdown-id') !== id) {
            $(this).removeClass('is-open');
            $(this).addClass('is-closed');
          }
        });
      }); 

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

    this.initNav = function() {

      var currentBreakpoint = window.getComputedStyle(
          document.querySelector('body'), ':before'
      ).getPropertyValue('content').replace(/"/g, "");

      if(currentBreakpoint == 'medium-up' || currentBreakpoint == 'large-up') {
        
      } else {
        console.log('mobile nav init'); 
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
    offCanvasCartOpen = true; 
  }; 

  return Header;

})();




//<script>


// $(document).ready(function() {


// /*------------------------------------*\
//           #Sticky Main Nav Styles Toggle
//       \*------------------------------------*/

//       // Variable to detect if user is smooth scrolling to a section
//       var smoothScrolling = false; 

//       // Checks to see if there is a '[data-action="toggle-top-bar"]' to hide/show
//       // This prevents it from activating on small devices. 
//       if($('[sticky-nav]').length > 0) {

//           //
//           // Function checks to see if the user is scrolling, 
//           // if they are, 

//           (function($){

//               var prevScroll = 0;
//               var currentScroll; 
//               var stickyNavContainer = $('[sticky-nav]');
//               var navBar = $('[data-ui-component="main-navigation"]');
//               var cart = $('[data-ui-component="cart-icon"]'); 
//               var navBarHeight = navBar.height(); 
//               var didScroll = false; 
//               var theWindow = $(window);


//               $(window).scroll(function() {
//                   didScroll = true;
//               });
               
//               setInterval(function() {

//                 if (didScroll) {

//                   didScroll = false; 

//                   currentScroll = theWindow.scrollTop();
                  
//                   if(100 < currentScroll) {

//                     navBar.addClass('main-nav--fixed');  
//                     navBar.removeClass('main-nav--alt');
//                     cart.removeClass('cart--alt'); 

//                   } else {
                    
//                     navBar.removeClass('main-nav--fixed');

//                   }

//                    prevScroll = currentScroll; 

//                 } 

//               }, 300);

//           })(jQuery);
//       }

//       /*------------------------------------*\
//           #Nav Styles Toggle Based on page 
//       \*------------------------------------*/

//       //If the user is on the hangover-science.html page, show the alt styling for the nav and cart
//       //  

//       var altNavPage = 'hangover-science'; 

//       var hideLogoPage = '/'; 

//       (function($) {

//         // if(BF_current_page == altNavPage) {

//         //   $('[data-ui-component="main-navigation"]').addClass('mainNav--alt');
//         //   $('[data-ui-component="cart-icon"]').addClass('cart--alt'); 

//         // }

//         if(window.location.pathname === hideLogoPage || window.location.pathname === '/' ) {
//           $('[data-ui-component="main-navigation"]').addClass('is-logo-hidden');
//         }

//       })(jQuery);





//      /*------------------------------------*\
//           #Off Canvas 
//       \*------------------------------------*/

//       var offCanvasNav = $('[data-ui-component="off-canvas-navigation"]'); 

//       //
//       //Enable off  Canvas functionality by adding and removing the 'is-open class'
//       //
//       function togglemainNavSmall() {

//           if(offCanvasNav.hasClass('is-open')) {

//             offCanvasNav.removeClass('is-open'); 
//             offCanvasNav.addClass('is-closed'); 

//           } else {
            
//             offCanvasNav.removeClass('is-closed'); 
//              offCanvasNav.addClass('is-open'); 
             
//           }

//       }


//       $('[data-action="off-canvas-toggle"]').on('click', function() {
//         togglemainNavSmall();
//       });


//         //
//         //Function that can be used and inserted to check if we are on a mobile device
//         //
//         var checkIfMobile = function() {

//           var mediumUpDeviceBreakpoint  = 700; 

//           var windowWidth = $(window).width(); 

//           if(windowWidth > mediumUpDeviceBreakpoint) {

//               return false;

//           } else {

//               return true; 
//           }

//         };


//       $('.main-nav-menu-link').on('click', function() {

//         if(checkIfMobile()) {
//           offCanvasNav.removeClass('is-open'); 
//           offCanvasNav.addClass('is-closed');        
//         }
//       }); 


// }, 200); 




