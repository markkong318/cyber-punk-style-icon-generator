import loadImages from "image-promise";
import CropGraphicAction from "../image/action/crop-graphic-action";
import GraphicFillAction from "../image/action/fill-graphic-action";
import SplitRgbAction from "../image/action/split-rgb-action";
import DrawImageAction from "../image/action/draw-image-action";
import ShiftXAction from "../image/action/shift-x-action";
import Graphic from "../image/graphic";
import {
  $baseImage,
  $submit,
} from "../util/el";

$(document).ready(() => {
  $submit.click(async () => {
    const templateId = $('input[name=template]:checked').val();
    const templateImage = await loadImages('images/object/' + templateId + '.png');

    const [width, height] = $baseImage.getBackgroundSize().toArray();
    const [x, y] = $baseImage.getBackgroundPosition().toArray();

    const graphic = Graphic.create(600, 600);

    const sourceImage = $baseImage.getImage();

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
      rOffset: 10,
      gOffset: -5,
      bOffset: 5,
    });

    ShiftXAction.apply(graphic, {
      yStart: 100,
      yEnd: 220,
      xOffset: 5,
    });

    ShiftXAction.apply(graphic, {
      yStart: 300,
      yEnd: 305,
      xOffset: -40,
    });

    CropGraphicAction.apply(graphic, {
      size: 100,
    });

    DrawImageAction.apply(graphic,{ image: templateImage });

    const base64 = graphic.toDataURL();

    const link = document.createElement("a");
    link.href = base64;
    link.download = (+new Date()) + '.png';
    link.click();
  });
});
