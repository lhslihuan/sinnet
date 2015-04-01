(function(doc, win) {
    'use strict';

    // Banner animation
    var cur_index = 0, // Indicate current screen index
        isClickable = true,
        screen_list = $('.banner .wrapper >.animated');
    var len = screen_list.length;

    var cursorWrapper = $('.banner .cursor');

    for (var i = 0; i < screen_list.length; i++) {
        cursorWrapper.append('<span></span>');
    }
    var cursors = cursorWrapper.find('span');

    cursorWrapper.width(screen_list.length * 48 - 20);

    function goToScreen(prev, next) {
        // FadeOut current screen
        if (prev !== undefined) {
            isClickable = false; // Sync lock
            var prevItem = screen_list.eq(prev);
            if (prevItem.find('.initRight').length < 1) {
                prevItem.find('.animated:not(.animatedWrapper)').addClass('fadeOutLeftBig');
                prevItem.find('.animated').removeClass('fadeInLeftBig');
            } else {
                prevItem.find('.animated:not(.animatedWrapper)').addClass('fadeOutRightBig');
                prevItem.find('.animated').removeClass('fadeInRightBig');
            }
            prevItem.removeClass('fadeIn').addClass('fadeOut');

            prevItem.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                isClickable = true;
                prevItem.addClass('hide');
                prevItem.find('.animated:not(.animatedWrapper)').removeClass('fadeOutRightBig');
                prevItem.find('.animated:not(.animatedWrapper)').removeClass('fadeOutLeftBig');
            });
        }

        // FadeIn current screen
        var nextItem = screen_list.eq(next);
        nextItem.removeClass('hide');
        nextItem.removeClass('fadeOut').addClass('fadeIn');
        if (nextItem.find('.initRight').length < 1) {
            nextItem.find('.animated').addClass('fadeInLeftBig');
        } else {
            nextItem.find('.animated').addClass('fadeInRightBig');
        }

        // Change indicator
        cursors.removeClass('selected');
        cursors.eq(next).addClass('selected')

    }

    $('.banner .arrow-l').on('click', function() {
        if (!isClickable) {
            return;
        }
        var _prev = cur_index;
        cur_index = (cur_index + len - 1) % len;
        goToScreen(_prev, cur_index);

    })
    $('.banner .arrow-r').on('click', function() {
        if (!isClickable) {
            return;
        }
        var _prev = cur_index;
        cur_index = (cur_index + 1) % len;
        goToScreen(_prev, cur_index);
    });

    goToScreen(undefined, 0);



    // Feature animation
    var feature_index = 0;

    function changePic(prev, next) {
        $('.feature .icon-wp').removeClass('selected');
        $('.feature .icon-wp').eq(next).addClass('selected');

        $('.feature .legend').removeClass('em')
        $('.feature .legend').eq(next).addClass('em');

        $('.feature .pic-wp li').eq(next).removeClass('fadeOut').addClass('fadeIn').removeClass('hide');
        $('.feature .pic-wp li').eq(prev).removeClass('fadeIn').addClass('fadeOut');

    }

    $('.feature .icon-wp').on('click', function() {
        var _index = $('.feature .icon-wp').index($(this));
        if (_index !== feature_index) {
            changePic(feature_index, _index);
            feature_index = _index;
        }

    })

})(document, window);