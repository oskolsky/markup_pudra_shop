$(function() {
  
  $('#footer').stickyFooter();



  //****************************************************************************************************
  //
  // .. ITEMS
  //
  //****************************************************************************************************
  $('.items').find('.item').resizeToMaxHeight();



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
  $('#cycle-2-slider').cycle({
    centerHorz: true,
    centerVert: true,
    log: false,
    speed: 1000,
    swipe: true,
    timeout: 3000
  });

  $('.iosslider').each(function() {
    $(this).iosSlider({
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
      url: url
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
    var c = accounting.settings.currency;

    if ($(this).hasClass('__rub')) {
      c.format = '%v';
    } else if ($(this).hasClass('__usd')) {
      c.symbol = '$';
      c.format = '%s%v';
    } else if ($(this).hasClass('__eur')) {
      c.symbol = '€';
      c.format = '%s%v';
    }

    var
      number = parseFloat($(this).text()),
      formatMoney = accounting.formatMoney(number);
    
    if ($(this).hasClass('__rub')) {
      $(this).text(formatMoney).append('&nbsp;<span>руб.</span>');
    } else {
      $(this).text(formatMoney);
    }
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