import localStore from "../store/local-store";

import {
  $previewImage,
  $dragImage,
} from "./el";

const resizeDragger = () => {

  const [ imageWidth, imageHeight ] = $previewImage.getBackgroundImageSize().toArray();
  const containerWidth = $previewImage.width();
  const containerHeight = $previewImage.height();

  let scale, width, height, top, left;

  const imageRatio = imageWidth / imageHeight;
  const containerRatio = containerWidth / containerHeight;

  if (containerRatio > imageRatio) {
    scale = containerWidth / imageWidth;
    width = containerWidth;
    height = imageHeight * scale;
    top = (height - containerHeight) * 0.5 * -1;
    left = 0;
  } else {
    scale = containerHeight / imageHeight;
    height = containerHeight;
    width = imageWidth * scale;
    top = 0;
    left = (width - containerWidth) * 0.5 * -1;
  }

  localStore.scale = scale;

  $dragImage
    .setSize(width, height)
    .setPosition(left, top);

  $previewImage
    .setBackgroundSize(width, height)
    .setBackgroundPosition(left, top);
};

export default resizeDragger;

