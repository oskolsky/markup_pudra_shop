yepnope([

  //
  // .. Vendor
  //
  {
    load: [
      'timeout=1000!//code.jquery.com/jquery-2.0.3.min.js',
      'timeout=1000!//code.jquery.com/ui/1.10.3/jquery-ui.min.js'
    ],
    complete: function() {
      if (!window.jQuery) {
        yepnope([
          '/assets/javascripts/vendor/jquery-2.0.3.min.js', // .. 2.0.3
          '/assets/javascripts/vendor/jquery-ui.min.js' // .. 1.10.3
        ]);
      }
    }
  },

  {
    load: '/assets/javascripts/vendor/underscore-min.js', // .. 1.5.2
    complete: function() {
      yepnope('/assets/javascripts/vendor/backbone-min.js'); // .. 1.1.0
    }
  },
  
  '/assets/javascripts/vendor/smartresize.js', // .. http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
  '/assets/javascripts/vendor/doublehover.js', // .. https://gist.github.com/artpolikarpov/3428762
  
  {
    load: '/assets/javascripts/scrollwidth.js', // .. http://davidwalsh.name/detect-scrollbar-width
    complete: function() {
      scrollWidth();
    }
  },

  {
    load: '/assets/javascripts/vendor/cycle2/jquery.cycle2.min.js', // .. v20131005
    complete: function() {
      yepnope([
        '/assets/javascripts/vendor/cycle2/jquery.cycle2.carousel.min.js', // .. v20130528
        '/assets/javascripts/vendor/cycle2/jquery.cycle2.center.min.js', // .. v20131006
        '/assets/javascripts/vendor/cycle2/jquery.cycle2.scrollVert.min.js', // .. v20121120
        '/assets/javascripts/vendor/cycle2/jquery.cycle2.swipe.min.js' // .. v20121120
      ]);
    }
  },

  '/assets/javascripts/vendor/jquery.iosslider.min.js', // v1.3.24
  
  {
    load: '/assets/javascripts/vendor/jquery.arcticmodal-0.3.min.js', // .. 0.3
    complete: function() {
      $.arcticmodal('setDefault', {
        overlay: {
          css: {
            backgroundColor: '#000',
            opacity: .66
          }
        },
        openEffect: {
          speed: 200
        },
        closeEffect: {
          speed: 200
        }
      });
    }
  },
  
  {
    load: '/assets/javascripts/vendor/imagesloaded.pkgd.min.js', // .. 3.0.4
    complete: function() {
      yepnope([
        '/assets/javascripts/vendor/masonry.pkgd.min.js' // .. 3.1.2
      ]);
    }
  },
  
  {
    load: '/assets/javascripts/vendor/accounting.min.js', // .. 0.3.2
    complete: function() {
      accounting.settings = {
        currency: {
          decimal: '.',
          thousand: ' ',
          precision: 0
        },
        number: {
          decimal : '.',
          thousand: ' ',
          precision: 0
        }
      }
    }
  },

  //
  // .. Polyfills
  //
  {
    test: window.matchMedia,
    nope: '/assets/javascripts/polyfill/vendor/matchMedia.js' // .. https://github.com/paulirish/matchMedia.js/
  },

  {
    test: Modernizr.input.placeholder,
    nope: '/assets/javascripts/polyfill/vendor/jquery.placeholder.js' // .. https://github.com/danbentley/placeholder
  },
  
  //
  // .. Custom
  //
  '/assets/javascripts/jquery.extensions.js',
  '/assets/javascripts/forms.js',
  '/assets/javascripts/components.js',
  '/assets/javascripts/project.js'

]);  