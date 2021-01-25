import resizeDragger from "./util/resize-dragger";
import getBackgroundImage from "./util/get-background-image";

var $userimage = $('#userimage .inner');
var $coverimage = $('#coverimage .inner');

$(document).ready(function () {
  $('body').delegate('input[name=template]', 'change', function () {
    var value = $(this).val();
    var url = 'images/object/' + value + '.png';

    $coverimage.css('background-image', 'url(' + url + ')');
    if ($userimage.hasClass('dragged') === true) $userimage.attr('class', 'inner dragged');
    else $userimage.attr('class', 'inner');

    $('<img/>').attr('src', getBackgroundImage($userimage))
      .load(function () {
        const size = [this.width, this.height];
        const container_size = $userimage.width();
        resizeDragger(size, container_size, value);
      });
  });
});
