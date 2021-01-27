import getBackgroundSize from "./util/get-background-size";
import getBackgroundPosition from "./util/get-background-position";
import getBackgroundCenterPoint from "./util/get-background-center-point";
import getBackgroundImage from "./util/get-background-image";
import {
  $sizer,
  $userImage,
  $dragger,
} from "./util/el";

$(document).ready(function () {
  $sizer.slider({
    value: 100,
    max: 170,
    min: 30,
    slide: function (event, ui) {
      const trueSize = getBackgroundSize($userImage.css('background-size'));
      const position = getBackgroundPosition($userImage.css('background-position'));
      const center = getBackgroundCenterPoint(trueSize, position);
      $('<img/>').attr('src', getBackgroundImage($userImage))
        .on ('load', function () {
          const size = [this.width, this.height];
          const width = size[0] * (ui.value) / 100;
          const height = size[1] * (ui.value) / 100;
          const left = center[0] - width * 0.5;
          const top = center[1] - height * 0.5;

          $dragger
            .css('width', width + 'px').css('height', height + 'px')
            .css('top', top + 'px').css('left', left + 'px');
          $userImage
            .css('background-size', width + 'px ' + height + 'px')
            .css('background-position', left + 'px ' + top + 'px');
        });

    }
  });
});
