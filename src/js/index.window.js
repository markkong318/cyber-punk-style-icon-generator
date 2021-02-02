import resizeDragger from "./util/resize-dragger";
import { $previewImage } from "./util/el";

$(window).on('load', async() => {
  await $previewImage.updateImage();
  resizeDragger();
});
