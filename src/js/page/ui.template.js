import {
  $templateImage,
} from "../util/el";

$(document).ready(() => {
  $('body').delegate('input[name=template]', 'change', function () {
    const value = $(this).val();
    const url = 'images/object/' + value + '.png';

    $templateImage.css('background-image', 'url(' + url + ')');
  });
});
