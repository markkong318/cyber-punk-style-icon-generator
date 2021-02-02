import {
  $previewImage,
  $dragImage,
} from "./util/el";

$(document).ready(() => {
  $dragImage.draggable({
    drag: () => {
      $previewImage.css('background-position', $dragImage.css('left') + ' ' + $dragImage.css('top'));
      // if (!$previewImage.hasClass('dragged')) {
      //   $previewImage.addClass('dragged');
      // }
    }
  });
});

