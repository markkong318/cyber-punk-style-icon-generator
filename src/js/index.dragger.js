
var $dragger = $('#dragger');
var $userimage = $('#userimage .inner');

$(document).ready(function () {
  $dragger.draggable({
    drag: function () {
      $userimage.css('background-position', $dragger.css('left') + ' ' + $dragger.css('top'));
      if ($userimage.hasClass('dragged') === false) {
        $userimage.addClass('dragged');
      }

      const value = $('input[name=template]:checked').val();
      if (value === 9 || value === 10) {
        $userimage.attr('class', 'inner');
      }
    }
  });
});
