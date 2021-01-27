import resizeDragger from "./util/resize-dragger";
import getBackgroundImage from "./util/get-background-image";
import {
  $userImage,
  $coverImage,
} from "./util/el";

$(document).ready(function () {
  $('body').delegate('input[name=template]', 'change', function () {
    var value = $(this).val();
    var url = 'images/object/' + value + '.png';

    $coverImage.css('background-image', 'url(' + url + ')');
    if ($userImage.hasClass('dragged') === true) $userImage.attr('class', 'inner dragged');
    else $userImage.attr('class', 'inner');

    $('<img/>').attr('src', getBackgroundImage($userImage))
      .load(function () {
        const size = [this.width, this.height];
        const container_size = $userImage.width();
        resizeDragger(size, container_size, value);
      });
  });
});
