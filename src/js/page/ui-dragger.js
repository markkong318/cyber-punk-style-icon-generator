import {
  $baseImage,
  $dragImage,
} from "../util/el";

$(document).ready(() => {
  $dragImage.draggable({
    drag: () => {
      $baseImage.css('background-position', $dragImage.css('left') + ' ' + $dragImage.css('top'));
    }
  });
});

