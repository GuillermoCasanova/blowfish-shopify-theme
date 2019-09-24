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
    if($(this).val() == 0) {
      $(this).parents('.cart__line-item').find('[data-remove-item]').get(0).click(); 
    } else {
      $(config.form).submit(); 
    }
  });

})(); 