

/**
 * Featured Products Section Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Featured Products Section.
 *
   * @namespace featuredProducts
 */

theme.FeaturedProducts = (function() {


  var selectors = {
     products: '[data-featured-product]',
     productLinks: '[data-product-link]',
     productsContainer: '[data-featured-products-container]'
  };

  var FeaturedProducts = function(container) {

    this.$container = $(container);

    if (!$(selectors.productsContainer).length > 0) {
      return;
    }
    
    this.init(); 
  };


  FeaturedProducts.prototype = $.extend({}, FeaturedProducts.prototype, {

    init: function() {

      let that  = this; 
      let $products = $(selectors.products); 

      let initFunctionality = function(pCurrentBreakpoint) {
        setTimeout(function() {
          if(pCurrentBreakpoint == 'large-up') {
            that.initDesktop();
          } else {
            that.initMobile(); 
          }
        }, 200);   

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


     $(window).on('resize', function() {
       throttle(function() {
        initFunctionality(that.getCurrentBreakPoint()); 
      }, 600); 
     }); 

     initFunctionality(that.getCurrentBreakPoint()); 

     $products.each(function(index) {
       let $productContainer = $(this); 

       $productContainer.find(selectors.productLinks).hover(function() {
         $(this).parent().addClass('is-hovered');
       }, function() {
         $(this).parent().removeClass('is-hovered');
       });

       $productContainer.find(selectors.productLinks).focus(function() {
         $(this).parent().addClass('is-hovered');
       }, function() {
         $(this).parent().removeClass('is-hovered');
       });

     });

    },
    getCurrentBreakPoint: function() {
      let currentBreakpoint = window.getComputedStyle(
          document.querySelector('body'), ':before'
      ).getPropertyValue('content').replace(/"/g, "");

      return currentBreakpoint; 
    }, 
    initMobile: function() {

      if(this.$slideshow) {
        this.featuredProductsSlidehow.destroy(true, true);
        this.$slideshow.removeClass('swiper-container');
        this.$slides.unwrap(".swiper-wrapper");
        this.$slides.removeClass('swiper-slide');
        $('.swiper-pagination').remove();  
      }

      let swiperComponents = '<div class="swiper-pagination"></div>'

      this.$slideshow = $(selectors.productsContainer); 
      this.$slides = $(selectors.products);

      this.$slideshow.addClass('swiper-container');
      this.$slides.wrapAll("<div class='swiper-wrapper'/>");
      this.$slides.addClass('swiper-slide'); 
      this.$slideshow.append(swiperComponents);


      var slideshowOptions = {}; 

      if(this.getCurrentBreakPoint() == 'medium-up') {
        slideshowOptions = {
          direction: 'horizontal',
          slidesPerView: 1,
          autoHeight: true,
          spaceBetween: 0, 
          slidesPerView: 2, 
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
          }
        }
      } 

      if(this.getCurrentBreakPoint() == 'small') {
        slideshowOptions = {
          direction: 'horizontal',
          slidesPerView: 1,
          autoHeight: true,
          spaceBetween: 30, 
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
          }
        }
      } 

      this.featuredProductsSlidehow = new Swiper(selectors.productsContainer, slideshowOptions);


    },
    initDesktop: function() {

      if(this.$slideshow) {
        this.featuredProductsSlidehow.destroy(true, true);
        this.$slideshow.removeClass('swiper-container');
        this.$slides.unwrap(".swiper-wrapper");
        this.$slides.removeClass('swiper-slide');
        $('.swiper-pagination').remove();  
      }
    }

  });

  return FeaturedProducts;

})();

