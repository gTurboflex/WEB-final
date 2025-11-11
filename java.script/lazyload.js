$(function () {
  function lazyLoad() {
    $('.lazy-img').each(function () {
      let imgTop = $(this).offset().top;
      let scrollBottom = $(window).scrollTop() + $(window).height();

      if (scrollBottom > imgTop - 100) {
        let realSrc = $(this).attr('data-src');
        if (realSrc && $(this).attr('src') !== realSrc) {
          $(this).attr('src', realSrc).hide().fadeIn(600);
        }
      }
    });
  }

  $(window).on('scroll', lazyLoad);
  $(window).on('load', lazyLoad);
});
