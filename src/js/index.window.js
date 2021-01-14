$(window).konami({
  code: [55, 55, 55],
  cheat: function () {
    $('.banana').slideDown();
  }
});

$(window).konami({
  code: [54, 54, 54],
  cheat: function () {
    $('h1,#size-slider').delay(100).animate({ 'opacity': '0' }, 2900);
    $('#formbuttons,.template-label').delay(400).animate({ 'opacity': '0' }, 2600);
    $('#settings').delay(1000).animate({ 'opacity': '0' }, 2000);
    $('.left-bottom-corner').delay(800).animate({ 'opacity': '0' }, 2200);
    $('.preview').animate({ 'top': '-500px', 'opacity': '0.5' }, 3000).animate({
      'width': '0',
      'opacity': '0'
    }, 3000, function () {
      $('#content').slideUp();
    });
  }
});
