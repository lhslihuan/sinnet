(function(doc, win) {
  'use strict';
  var html = [];
  var index = 0;
  $('.jobContainer >div .job-title').each(function() {
    var str = $(this).html();
    if (/\<a/.test(str)) {
      html[index++] = $(this).html();
    }
  });
  var top_bar = $('<div class="jobNav"><div class="ph"></div><div class="content"><div>' + html.join('') + '</div></div></div>').insertBefore($('.jobContainer'));
  top_bar.find('a').each(function(index) {
    $(this).data('index', index);
  });
  top_bar.on('click', 'a', function() {
    var url = $(this).attr('href').replace(/(.*)\#/, '');
    var div = $('#' + url);
    var offset = div.offset().top;
    if (offset >= 50 + $('.hireBanner').outerHeight()) {
      $('body').animate({
          scrollTop: offset - 200
        },
        300);
    } else {
      $('body').animate({
          scrollTop: offset
        },
        300);
    }
    return false;
  });
  $(win).on('scroll', function() {
    var scrolltop = $(doc).scrollTop();
    if (scrolltop >= 150 + $('.hireBanner').outerHeight()) {
      top_bar.addClass('show');
    } else {
      top_bar.removeClass('show');
    }
    var jobs = $('.job');
    for (var i = 0; i < jobs.length - 1; i++) {
      var job = jobs.eq(i);
      var offset = job.offset().top;
      if (offset + job.outerHeight() >= scrolltop + 240) {
        $('.jobNav a').removeClass('selected').eq(i).addClass('selected');
        break;
      }
    }
  });
})(document, window);