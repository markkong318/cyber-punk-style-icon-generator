import Size from "../entity/Size";
import Position from "../entity/Position";
import loadImages from "image-promise";
// import { $previewImage } from "../util/el";

$.fn.installBackgroundImageExtend = function() {
  let image;

  return $.extend(this, {
    updateImage: async (src) => {
      if (!src) {
        src = this.getBackgroundImage();
      }

      image = await loadImages(src);

      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);

      const base64 = canvas.toDataURL("image/png");

      this.css('background-image', 'url(' + base64 + ')');

      image = await loadImages(base64);
    },
    getImage: () => {
      return image;
    },
    getBackgroundImage: () => {
      const url = this.css('background-image');
      return url.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
    },
    getBackgroundImageSize: () => {
      return new Size(image.width, image.height);
    },
    getBackgroundSize: () => {
      const [width, height] =
        this.css('background-size')
          .split(' ')
          .map((srt) => parseInt(srt.replace('px', '')));

      return new Size(width, height);
    },
    getBackgroundPosition: () => {
      const [x, y] = this.css('background-position')
        .split(' ')
        .map((srt) => parseInt(srt.replace('px', '')));

      return new Position(x, y);
    },
    getBackgroundCenterPosition: () => {
      const size = this.getBackgroundSize();
      const position = this.getBackgroundPosition();

      return new Position(size.width * 0.5 + position.x, size.height * 0.5 + position.y);
    },
    setBackgroundSize: (width, height) => {
      return this.css('background-size', width + 'px ' + height + 'px');
    },
    setBackgroundPosition: (left, top) => {
      return this.css('background-position', left + 'px ' + top + 'px');
    },
  });
};
