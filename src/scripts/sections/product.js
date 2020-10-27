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
    mobileHeader: '[data-mobile-header]',
    product: '[data-product]',
    products: '[data-products]',
    productPageNav: '[data-product-page-nav]',
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

  }

  Product.prototype = $.extend({}, Product.prototype, {

    productPageNav:  {
      init: function() {

        let that = this; 

        this.navHeight = $(selectors.mobileHeader).height(); 
        this.$productPageNavLinks = $(selectors.productPageNavLinks); 
        this.currentProductHandle = (window.location.pathname).replace('/products/', ''); 
        this.$productPageNavItems = $(selectors.productPageNavItems);
        this.$products = $(selectors.products);  
        var $productPageNavScroll = $('[data-product-page-nav-scroll]'); 


        // var mySwiper = new Swiper('.swiper-container', {
        // })


        this.$productPageNavLinks.on('click', function(e) {
         e.preventDefault(); 

          // let productId = $(this).attr("href"); 

          // that.setActiveProduct(this); 

          // var target = this; 
          // var targetIndex = that.$productPageNavLinks.index(this) + 1;

          // console.log($(this).parent().offset().left);
          // console.log($('.product-page-nav__links').outerWidth(true));
          // console.log($productPageNavScroll.outerWidth(true));

          // // console.log($productPageNavScroll.scrollLeft()); 
          // // console.log($productPageNavScroll.outerWidth(true) / 2);
          // // console.log(($(target).parent().outerWidth(true) / 2) - $productPageNavScroll.scrollLeft()); 

          // // $productPageNavScroll.animate({
          // //   scrollLeft: ( / 2) - $(this).scrollLeft
          // // }, 600);

          //that.goToProduct(productId); 
        });
      },
      setActiveProduct: function(pLinkClicked) {
        this.$productPageNavItems.removeClass('is-active'); 
        $(pLinkClicked).parent().addClass('is-active');
      }, 
      goToProduct: function(pProductId) {

        let that = this; 
        let sectionDistanceFromTop = this.$products.find(pProductId).offset().top; 

      // var activeCategory = this.getSetActiveCategory()

      //   if(activeCategory) {
      //     var $activeSlide = $(activeCategory);
      //   } else {
      //     return false; 
      //   }
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
     * Event callback for Theme Editor `section:unload` event
     */
    onUnload: function() {
      this.$container.off(this.namespace);
    }

  });

  return Product;
})();
