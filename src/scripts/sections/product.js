/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
   * @namespace product
 */

theme.Product = (function() {

  var selectors = {
    addToCart: '[data-add-to-cart]',
    addToCartText: '[data-add-to-cart-text]',
    comparePrice: '[data-compare-price]',
    comparePriceText: '[data-compare-text]',
    originalSelectorId: '[data-product-select]',
    optionSelector: '[data-option-selector]',
    priceWrapper: '[data-price-wrapper]',
    productFeaturedImage: '[data-product-featured-image]',
    productJson: '[data-product-json]',
    productPrice: '[data-product-price]',
    productThumbs: '[data-product-single-thumbnail]',
    singleOptionSelector: '[data-single-option-selector]',
    header: '[data-header]',
    product: '[data-product]',
    products: '[data-products]',
    productPageNav: '[data-product-page-nav]',
    productPageNavScroll: '[data-product-page-nav-scroll]',
    productPageNavLinks: '[data-product-page-nav-link]',
    productPageNavItems: '[data-product-page-nav-item]'
  };

  console.log(selectors); 

  /**
   * Product section constructor. Runs on page load as well as Theme Editor
   * `section:load` events.
   * @param {string} container - selector for the section container DOM element
   */
  function Product(container) {
    this.$container = $(container);


    console.log($(selectors.productJson).html());

    // Stop parsing if we don't have the product json script tag when loading
    // section in the Theme Editor
    if (!$(selectors.productJson, this.$container).html()) {
      return;
    }

    var sectionId = this.$container.attr('data-section-id');
    this.productSingleObject = JSON.parse($(selectors.productJson, this.$container).html());

    var options = {
      $container: this.$container,
      enableHistoryState: this.$container.data('enable-history-state') || false,
      singleOptionSelector: selectors.singleOptionSelector,
      originalSelectorId: selectors.originalSelectorId,
      product: this.productSingleObject
    };

    this.settings = {};
    this.namespace = '.product';
    this.variants = new slate.Variants(options);
    this.$featuredImage = $(selectors.productFeaturedImage, this.$container);

    this.$container.on('variantChange' + this.namespace, this.updateAddToCartState.bind(this));
    this.$container.on('variantPriceChange' + this.namespace, this.updateProductPrices.bind(this));

    if (this.$featuredImage.length > 0) {
      this.settings.imageSize = slate.Image.imageSize(this.$featuredImage.attr('src'));
      slate.Image.preload(this.productSingleObject.images, this.settings.imageSize);

      this.$container.on('variantImageChange' + this.namespace, this.updateProductImage.bind(this));
    }

    this.productPageNav.init(); 
    this.initAjaxCart(); 
    

  }

  Product.prototype = $.extend({}, Product.prototype, {

    productPageNav:  {
      init: function() {

        let that = this; 

        this.navHeight = $(selectors.header).height(); 
        this.$productPageNavLinks = $(selectors.productPageNavLinks); 
        this.currentProductHandle = (window.location.pathname).replace('/products/', ''); 
        this.$productPageNavItems = $(selectors.productPageNavItems);
        this.$productPageNavScroll = $(selectors.productPageNavScroll); 
        this.$products = $(selectors.products);  
        var $productPageNavScroll = $('[data-product-page-nav-scroll]'); 

        this.setActiveProduct(this.currentProductHandle); 

        this.$productPageNavLinks.on('click', function(e) {
         e.preventDefault(); 
         let productId = $(this).attr("href").replace('#', ''); 
         that.setActiveProduct(productId); 
         that.goToProduct($(this).attr("href")); 
        });
      },
      setActiveProduct: function(pProductHandle, pSpeed) {
        console.log(pProductHandle); 
        let id = pProductHandle;

        this.$productPageNavItems.removeClass('is-active'); 

        this.$productPageNavItems.each(function() {

         var linkHandle = $(this).find('a').attr("href").replace('#', '');

         if(linkHandle == pProductHandle) {
            $(this).addClass('is-active');
         }
        }); 

        var active = this.$productPageNavScroll.find('.is-active'); // find the active element
        var activeWidth = active.width() / 2; // get active width center

        var pos = active.position().left + activeWidth; //get left position of active li + center position
        var elpos = this.$productPageNavScroll.scrollLeft(); // get current scroll position
        var elW = this.$productPageNavScroll.width(); //get div width
        //var divwidth = $(elem).width(); //get div width
        pos = pos + elpos - elW / 2; // for center position if you want adjust then change this

        this.$productPageNavScroll.animate({
          scrollLeft: pos
        }, pSpeed == undefined ? 600 : pSpeed);
        return this;

      }, 
      goToProduct: function(pProductId) {

        let that = this; 
        let sectionDistanceFromTop = this.$products.find(pProductId).offset().top; 

        $('html, body').animate({
          scrollTop: sectionDistanceFromTop - that.navHeight * 2
        }, 1000)
      }
    },

    /**
     * Updates the DOM state of the add to cart button
     *
     * @param {boolean} enabled - Decides whether cart is enabled or disabled
     * @param {string} text - Updates the text notification content of the cart
     */
    updateAddToCartState: function(evt) {
      var variant = evt.variant;

      if (variant) {
        $(selectors.priceWrapper, this.$container).removeClass('hide');
      } else {
        $(selectors.addToCart, this.$container).prop('disabled', true);
        $(selectors.addToCartText, this.$container).html(theme.strings.unavailable);
        $(selectors.priceWrapper, this.$container).addClass('hide');
        return;
      }

      if (variant.available) {
        $(selectors.addToCart, this.$container).prop('disabled', false);
        $(selectors.addToCartText, this.$container).html(theme.strings.addToCart);
      } else {
        $(selectors.addToCart, this.$container).prop('disabled', true);
        $(selectors.addToCartText, this.$container).html(theme.strings.soldOut);
      }
    },

    /**
     * Updates the DOM with specified prices
     *
     * @param {string} productPrice - The current price of the product
     * @param {string} comparePrice - The original price of the product
     */
    updateProductPrices: function(evt) {
      var variant = evt.variant;
      var $comparePrice = $(selectors.comparePrice, this.$container);
      var $compareEls = $comparePrice.add(selectors.comparePriceText, this.$container);

      $(selectors.productPrice, this.$container)
        .html(slate.Currency.formatMoney(variant.price, theme.moneyFormat));

      if (variant.compare_at_price > variant.price) {
        $comparePrice.html(slate.Currency.formatMoney(variant.compare_at_price, theme.moneyFormat));
        $compareEls.removeClass('hide');
      } else {
        $comparePrice.html('');
        $compareEls.addClass('hide');
      }
    },

    /**
     * Updates the DOM with the specified image URL
     *
     * @param {string} src - Image src URL
     */
    updateProductImage: function(evt) {
      var variant = evt.variant;
      var sizedImgUrl = slate.Image.getSizedImageUrl(variant.featured_image.src, this.settings.imageSize);

      this.$featuredImage.attr('src', sizedImgUrl);
    },
    
    /**
     * Initializes the AJAX cart with product template properties  
     */
    initAjaxCart: function() {
      //  ajaxCart.init({
      //     formSelector: '#AddToCartForm--' + this.$container.attr('data-section-id'),
      //     cartContainer: '#CartContainer',
      //     addToCartSelector: '#AddToCart--' + this.$container.attr('data-section-id'),
      //     moneyFormat: theme.strings.moneyFormat
      // });
    },
    /**
     * Event callback for Theme Editor `section:unload` event
     */
    onUnload: function() {
      this.$container.off(this.namespace);
    }

  });

  return Product;
})();
