import loadImages from "image-promise";
import CropGraphicAction from "./image/action/crop-graphic-action";
import GraphicFillAction from "./image/action/fill-graphic-action";
import SplitRgbAction from "./image/action/split-rgb-action";
import DrawImageAction from "./image/action/draw-image-action";
import ShiftXAction from "./image/action/shift-x-action";
import Graphic from "./image/graphic";
// import getBackgroundSize from "./util/get-background-size";
// import getBackgroundPosition from "./util/get-background-position";
import {
  $previewImage,
  $submit,
  $download,
} from "./util/el";

$(document).ready(() => {
  $submit.click(async () => {
    const templateId = $('input[name=template]:checked').val();
    const templateImage = await loadImages('images/object/' + templateId + '.png');

    const [width, height] = $previewImage.getBackgroundSize().toArray();
    const [x, y] = $previewImage.getBackgroundPosition().toArray();

    const graphic = Graphic.create(600, 600);

    const sourceImage = $previewImage.getImage();

    GraphicFillAction.apply(graphic, {
      color: '#000000',
    });

    DrawImageAction.apply(graphic,{
      image: sourceImage,
      x: x + 50,
      y: y + 50,
      width: width,
      height: height,
    });

    SplitRgbAction.apply(graphic, {
      rOffset: 20,
      gOffset: -10,
      bOffset: 10,
    });

    ShiftXAction.apply(graphic, {
      yStart: 200,
      yEnd: 250,
      xOffset: 25,
    });

    CropGraphicAction.apply(graphic, {
      size: 100,
    });

    DrawImageAction.apply(graphic,{ image: templateImage });

    const base64 = graphic.toDataURL();

    $download.attr('href', base64);
    $download.attr('download', (+new Date()) + '.png');
    $download[0].click();

  });
});

// const createImage = async(template, source, x, y, w, h) => {
//   const graphic = Graphic.create(600, 600);
//
//   const sourceImage = await loadImages(source);
//   const coverImage = await loadImages('images/object/' + template + '.png');
//
//   GraphicFillAction.apply(graphic, {
//     color: '#000000',
//   });
//
//   DrawImageAction.apply(graphic,{
//     image: sourceImage,
//     x: x + 50,
//     y: y + 50,
//     width: w,
//     height: h,
//   });
//
//   SplitRgbAction.apply(graphic, {
//     rOffset: 20,
//     gOffset: -10,
//     bOffset: 10,
//   });
//
//   ShiftXAction.apply(graphic, {
//     yStart: 200,
//     yEnd: 250,
//     xOffset: 25,
//   });
//
//   CropGraphicAction.apply(graphic, {
//     size: 100,
//   });
//
//   DrawImageAction.apply(graphic,{ image: coverImage });
//
//   const base64 = graphic.toDataURL();
//
//   $download.attr('href', base64);
//   $download.attr('download', (+new Date()) + '.png');
//   $download[0].click();
// };
