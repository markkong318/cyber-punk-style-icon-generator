import render from "../util/render";
import { $baseImage } from "../util/el";

$(window).on('load', async() => {
  await $baseImage.updateImage();
  render.preview();
});
