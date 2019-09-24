/**
 * Hangover Science Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Hangover Science template.
 *
 * @namespace hangover science
 */


theme.hangoverScience = (function() {

	$(document).ready(function() {

	  if($('[data-ui-component="hangover-science-narrative"]').length > 0 ) {


      //
      //Uses the NavState service to toggle classes of the navigation
      //
      NavState.makeNavAlt();

	    var nextSlideBtn = $('[data-action="go-to-next-slide"]'); 

	    var backToTopBtn = $('[data-action="go-to-first-slide"]'); 


	    //
	    //Function that can be used and inserted to check if we are on a mobile device
	    //
	    var checkIfMobile = function() {

	      var mediumUpDeviceBreakpoint  = 700; 

	      var windowWidth = $(window).width(); 

	      if(windowWidth > mediumUpDeviceBreakpoint) {

	          return false;

	      } else {

	          return true; 
	      }

	    };


	    //
	    //If this device is wide enough, we enable fullpage js 
	    //
	    if(!checkIfMobile()) {

		    $('[data-ui-component="hangover-science-narrative"]').fullpage( {


		        //
		        //Menu
		        //
		        menu: '[data-ui-component="hangover-science-narrative-menu"]',
		        anchors:['Hangover-Science', 
		                 'Headache',
		                 'Nausea',
		                 'Dehydration', 
		                 'Irritability',
		                 'Fatigue',
		                 'Impaired-Mental-Function',
		                 'Sensitivity',
		                 'Difficulty-Focusing',
		                 'Blowfish-For-Hangovers'],
		        navigation: true,

		        //
		        //Accesibility
		        //
		        animateAnchor: false, 

		        //
		        //Scrolling
		        //
		        scrollingSpeed: 1000, 
		        easing: 'easeInOutQuint',
		        
		        //
		        //Slides 
		        //
		        sectionSelector: '[data-ui-component="hangover-science-narrative-slide"]',

		        //
		        //Events
		        //
		        onLeave: function(index, nextIndex, direction) {

		          //
		          //Uses the NavState service to toggle classes of the navigation
		          //
		          NavState.makeNavMinimal();

	            if(nextIndex % 2 === 0 ) {
	              NavState.makeNavNormal(); 
	            } 

	            if(nextIndex % 2 === 1) {

	              NavState.makeNavAlt(); 
	            }

	            if(nextIndex === 1) {

	              NavState.makeNavFull();

	            }

	            if(nextIndex === 10) {
	          		NavState.makeNavFull();
	            }

	            if(nextIndex === 10) {
	            	$('.narrative-footer').addClass("is-showing"); 
	            } else {
	            	$('.narrative-footer').removeClass("is-showing"); 
	            }
		        }
		    }); 

	    }


	    //
	    //Whecn clicked, used method to go to next slide
	    //

	    nextSlideBtn.on('click', function() {

	      $.fn.fullpage.moveSectionDown();

	    }); 


	    //
	    //Whecn clicked, used method to go to first slide in narrative
	    //

	    backToTopBtn.on('click', function() {

	      $.fn.fullpage.moveTo('Hangover-Science');

	    }); 


	  }; 

	}); 

})(); 