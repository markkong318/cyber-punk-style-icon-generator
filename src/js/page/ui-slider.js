import localStore from "../store/local-store";
import {
  $slider,
  $baseImage,
  $dragImage,
} from "../util/el";

$(document).ready(() => {
  $slider.slider({
    value: 100,
    max: 170,
    min: 30,
    slide: function (event, ui) {
      const [imageWidth, imageHeight] = $baseImage.getBackgroundImageSize().toArray();
      const [imageX, imageY] = $baseImage.getBackgroundCenterPosition().toArray();

      const scale = localStore.scale;

      const width = parseInt(imageWidth * scale * (ui.value) / 100);
      const height = parseInt(imageHeight * scale * (ui.value) / 100);
      const left = parseInt(imageX - width * 0.5);
      const top = parseInt(imageY - height * 0.5);

      $dragImage
        .setSize(width, height)
        .setPosition(left, top);

      $baseImage
        .setBackgroundSize(width, height)
        .setBackgroundPosition(left, top);
    }
  });
});
