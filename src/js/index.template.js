// import resizeDragger from "./util/resize-dragger";
// import getBackgroundImage from "./util/get-background-image";
import {
  // $previewImage,
  $coverImage,
} from "./util/el";

$(document).ready(() => {
  $('body').delegate('input[name=template]', 'change', function () {
    const value = $(this).val();
    const url = 'images/object/' + value + '.png';

    $coverImage.css('background-image', 'url(' + url + ')');
    // if ($previewImage.hasClass('dragged')) {
    //   $previewImage.attr('class', 'inner dragged');
    // } else {
    //   $previewImage.attr('class', 'inner');
    // }

    // $('<img/>').attr('src', getBackgroundImage($previewImage))
    //   .load(function () {
    //     const size = [this.width, this.height];
    //     const container_size = $previewImage.width();
    //     resizeDragger(size, container_size);
    //   });
  });
});
