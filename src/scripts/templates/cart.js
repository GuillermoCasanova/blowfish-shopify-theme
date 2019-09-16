/**
 * Cart Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Cart template.
 *
 * @namespace cart
 */

theme.cart = (function() {
  var config = {
    cartPage: '#Cart-page',
    quantitySelectors: '[data-quantity-select]',
    body: 'body',
    form: 'form'
  };


  if (!$(config.cartPage).length) {
    return;
  }

  const $body = $(config.body); 

  $body.on('change', config.quantitySelectors, function() {
  	$(config.form).submit(); 
  });

})(); 