$(function() {
  
  $('#footer').stickyFooter();



  //****************************************************************************************************
  //
  // .. HOME NAVIGATION
  //
  //****************************************************************************************************
  if ($('.home-nav').length > 0) {
    var h = $('.home-nav').find('> ul').outerHeight();
    $('.home-nav').find('.imageslider').find('img').css({height: h + 'px'});
  }



  //****************************************************************************************************
  //
  // .. ITEMS
  //
  //****************************************************************************************************
  $('.items').find('.item').resizeToMaxHeight();



  //****************************************************************************************************
  //
  // .. SITE MAP
  //
  //****************************************************************************************************
  $('#site-map').find('.site-map_toggle_a').click(function() {
    var $el = $('#site-map').find('.site-map_navs');
    if ( $el.is(':hidden') ) {
      $(this).addClass('__open');
      $el.slideDown();
    } else {
      $(this).removeClass('__open');
      $el.slideUp();
    }
    return false;
  });



  //****************************************************************************************************
  //
  // .. TABS
  //
  //****************************************************************************************************
  $('#tabs').tabs();

  $('.tabs.__catalog').on('tabsactivate', function(event, ui) {
    $('.iosslider.__catalog').iosSlider('update');
  });



  //****************************************************************************************************
  //
  // .. FILTER
  //
  //****************************************************************************************************
  $('.filter_block').each(function() {
    $(this).find('.filter_block_t').click(function() {
      if ($(this).siblings('.filter_block_b').is(':hidden')) {
        $(this).siblings('.filter_block_b').slideDown();
      } else {
        $(this).siblings('.filter_block_b').slideUp();
      }
    });
  });

  $('.filter_accordion').find('.filter_accordion_i').each(function() {
    $(this).find('.filter_accordion_i_t').click(function() {
      if ($(this).siblings('.filter_accordion_i_b').is(':hidden')) {
        $(this).siblings('.filter_accordion_i_b').slideDown();
        $(this).addClass('__open');
      } else {
        $(this).siblings('.filter_accordion_i_b').slideUp();
        $(this).removeClass('__open');
      }
    });
  });



  //****************************************************************************************************
  //
  // .. DOUBLE HOVER
  //
  //****************************************************************************************************
  doubleHover('a.double-hover', 'hover');



  //****************************************************************************************************
  //
  // .. FORMS
  //
  //****************************************************************************************************
  $('.form').customForm(); // $('#checkbox').customForm() to init single element; $('body').customForm() to init all elements



  //****************************************************************************************************
  //
  // .. SCROLL TO
  //
  //****************************************************************************************************
  $('a[data-scroll="true"]').on('click touchstart', function() {
    var      anchor = $(this).attr('href'),
        destination = $(anchor).offset().top;
    
    $('html, body').animate({scrollTop: destination}, 500);
    
    return false;
  });
  


  //****************************************************************************************************
  //
  // .. SLIDERS
  //
  //****************************************************************************************************
  $('.imageslider').each(function() {
    var _this = this;
    $(_this).find('.slider').cycle({
      fx: 'scrollHorz',
      log: false,
      speed: 250,
      swipe: true,
      timeout: 3000,
      slides: '.slide',
      pager: $(_this).find('.slider-nav'),
      pagerTemplate: '<i class="slider-nav_i" />'
    });
  });

  $('.iosslider').each(function() {
    $(this).iosSlider({
      autoSlide: false,
      navSlideSelector: $(this).find('.slider-nav').find('.slider-nav_i'),
      responsiveSlideContainer: false,
      responsiveSlides: false,
      snapToChildren: true,
      onSliderLoaded: function(args) {
        var h = args.sliderObject.find('.slide').css({height: ''}).maxHeight();
        args.sliderObject.find('.slide').css({height: ''}).resizeToMaxHeight();
        args.sliderObject.closest('.iosslider').css({height: h + 'px'});
        // todo: купить слайдер
        $('.iosslider').find('i').remove();
      },
      onSlideStart: function(args) {
        args.sliderObject.closest('.iosslider').find('.slider-nav').find('.slider-nav_i').removeClass('__current');
      },
      onSlideComplete: function(args) {
        args.sliderObject.closest('.iosslider').find('.slider-nav').find('.slider-nav_i:eq(' + (args.currentSlideNumber - 1) + ')').addClass('__current');
      }
    });

  });




  //****************************************************************************************************
  //
  // .. DIALOGS
  //
  //****************************************************************************************************
  //
  // .. Open dialog
  //
  $(document).on('click touchstart', '[data-dialog="true"]', function() {
    var url = $(this).data('url');
    
    $.arcticmodal({
      type: 'ajax',
      url: url,
      afterOpen: function() {
        $('.form').customForm();
      }
    });
    
    return false;
  });

  //
  // .. Close dialog
  //
  $(document).on('click touchstart', '.js-dialog_close', function() {
    $.arcticmodal('close');
  });



  //****************************************************************************************************
  //
  // .. ACCOUNTING
  //
  //****************************************************************************************************
  //
  // .. Number
  //
  $('.format-number').each(function() {
    var
      number = parseInt($(this).text()),
      formatNumber = accounting.formatNumber(number);

    $(this).text(formatNumber);
  });

  //
  // .. Money
  //
  $('.format-money').each(function() {
    bindAccounting($(this));
  });



  //****************************************************************************************************
  //
  // .. SCROLL
  //
  //****************************************************************************************************
  $(window).scroll(function() {});



  //****************************************************************************************************
  //
  // .. RESIZE
  //
  //****************************************************************************************************
  $(window).smartresize(function() {

    $('#footer').stickyFooter();

  });
  
});



//****************************************************************************************************
//
// .. LOAD
//
//****************************************************************************************************
$(window).load(function() {});



//****************************************************************************************************
//
// .. FUNCTION
//
//****************************************************************************************************
function bindAccounting($el) {
  var c = accounting.settings.currency;

  if ($el.hasClass('__rub')) {
    c.format = '%v';
  } else if ($el.hasClass('__usd')) {
    c.symbol = '$';
    c.format = '%s%v';
  } else if ($el.hasClass('__eur')) {
    c.symbol = '€';
    c.format = '%s%v';
  }

  var
    number = parseFloat($el.text()),
    formatMoney = accounting.formatMoney(number);

  if ($el.hasClass('__rub')) {
    $el.text(formatMoney).append('&nbsp;<span>руб.</span>');
  } else {
    $el.text(formatMoney);
  }
}