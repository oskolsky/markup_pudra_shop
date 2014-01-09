$(function() {

  // .. MASONRY INIT
  var $feed = $('#feed');

  // .. LOAD NEW MATERIALS
  $('#load').click(function() {
    var _this = this;

    if (!Refresher.inProgress) {
      Refresher.startAnimation();

      $.ajax({
        url: '/data/' + $(_this).attr('rel'),
        data: {},
        success: function(response) {
          var $moreBlocks = $(response);
          Refresher.stopAnimation(function() {
            if ($moreBlocks.length > 0) {
              $feed.append( $moreBlocks );
              $('.items').find('.item').removeAttr('style').resizeToMaxHeight();
            } else {
              $(_this).remove();
            }
          });

        },
        error: function() {
          Refresher.stopAnimation(function() {
            alert('Error load materials');
          });
        }
      });

    }
    return false;
  });

});

var Refresher = {

  inProgress: false,
  callback: null,

  startAnimation: function() {
    if (this.inProgress) {
      return;
    }
    this.inProgress = true;
    this.scheduleAnimation();
  },

  scheduleAnimation: function() {
    var _this = this;
    $('#refresher').animate({borderSpacing: 360}, {
      step: function(now, fx) {
        $(this).css('-webkit-transform','rotate(' + now + 'deg)');
        $(this).css('-moz-transform','rotate(' + now + 'deg)');
        $(this).css('-ms-transform','rotate(' + now + 'deg)');
        $(this).css('-o-transform','rotate(' + now + 'deg)');
        $(this).css('transform','rotate(' + now + 'deg)');
      },
      duration: 300,
      complete: function() {
        $(this).css('border-spacing', 0);
        if (_this.inProgress) {
          _this.scheduleAnimation();
        }

        if (_this.callback) {
          _this.callback();
          _this.callback = null;
        }
      }
    }, 'linear');
  },

  stopAnimation: function(callback) {
    this.inProgress = false;
    this.callback = callback;
  }

};