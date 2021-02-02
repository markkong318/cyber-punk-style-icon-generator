import localStore from "./store/local-store";
import {
  $slider,
  $previewImage,
  $dragImage,
} from "./util/el";

$(document).ready(() => {
  $slider.slider({
    value: 100,
    max: 170,
    min: 30,
    slide: function (event, ui) {
      const [imageWidth, imageHeight] = $previewImage.getBackgroundImageSize().toArray();
      const [imageX, imageY] = $previewImage.getBackgroundCenterPosition().toArray();

      const scale = localStore.scale;

      console.log([imageX, imageY]);

      const width = parseInt(imageWidth * scale * (ui.value) / 100);
      const height = parseInt(imageHeight * scale * (ui.value) / 100);
      const left = parseInt(imageX - width * 0.5);
      const top = parseInt(imageY - height * 0.5);

      $dragImage
        .setSize(width, height)
        .setPosition(left, top);

      $previewImage
        .setBackgroundSize(width, height)
        .setBackgroundPosition(left, top);
    }
  });
});
