import getBackgroundSize from "./util/get-background-size";
import getBackgroundPosition from "./util/get-background-position";
import getBackgroundCenterPoint from "./util/get-background-center-point";
import getBackgroundImage from "./util/get-background-image";

var $sizer = $('#size-slider');
var $userimage = $('#userimage .inner');
var $dragger = $('#dragger');

$(document).ready(function () {
  $sizer.slider({
    value: 100,
    max: 170,
    min: 30,
    slide: function (event, ui) {
      var truesize = getBackgroundSize($userimage.css('background-size'));
      var position = getBackgroundPosition($userimage.css('background-position'));
      var center = getBackgroundCenterPoint(truesize, position);
      $('<img/>').attr('src', getBackgroundImage($userimage))
        .on ('load', function () {
          var size = [this.width, this.height];
          var width = size[0] * (ui.value) / 100;
          var height = size[1] * (ui.value) / 100;
          var left = center[0] - width * 0.5;
          var top = center[1] - height * 0.5;
          $dragger
            .css('width', width + 'px').css('height', height + 'px')
            .css('top', top + 'px').css('left', left + 'px');
          $userimage
            .css('background-size', width + 'px ' + height + 'px')
            .css('background-position', left + 'px ' + top + 'px');
        });

    }
  });
});
