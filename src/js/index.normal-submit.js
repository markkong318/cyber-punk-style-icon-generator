import loadImages from "image-promise";
import CropGraphicAction from "./image/action/crop-graphic-action";
import GraphicFillAction from "./image/action/fill-graphic-action";
import SplitRgbAction from "./image/action/split-rgb-action";
import DrawImageAction from "./image/action/draw-image-action";
import ShiftXAction from "./image/action/shift-x-action";
import Graphic from "./image/graphic";
import getBackgroundSize from "./util/get-background-size";
import getBackgroundPosition from "./util/get-background-position";
import {
  $userImage,
  $normalSubmit,
  $download,
} from "./util/el";

$(document).ready(function () {
  $normalSubmit.click(function () {
    const baseSize = $userImage.width();
    const size = getBackgroundSize($userImage.css('background-size'));
    const position = getBackgroundPosition($userImage.css('background-position'));
    const scale = baseSize / 500;

    const template = $('input[name=template]:checked').val();
    const source = $('#source').val();
    const w = size[0] / scale;
    const h = size[1] / scale;
    const x = position[0] / scale;
    const y = position[1] / scale;

    createImage(template, source, x, y, w, h);
  });
});

const createImage = async(template, source, x, y, w, h) => {
  const graphic = Graphic.create(600, 600);

  const sourceImage = await loadImages(source);
  const coverImage = await loadImages('images/object/' + template + '.png');

  GraphicFillAction.apply(graphic, {
    color: '#000000',
  });

  DrawImageAction.apply(graphic,{
    image: sourceImage,
    x: x + 50,
    y: y + 50,
    width: w,
    height: h,
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

  DrawImageAction.apply(graphic,{ image: coverImage });

  const base64 = graphic.toDataURL();

  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ");

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./)) {
    let html = "<p>請按右鍵另存圖片</p>";
    html += "<img src='" + base64 + "' alt='10'/>";

    const tab = window.open();
    tab.document.write(html);
  } else {
    $download.attr('href', base64);
    $download.attr('download', (+new Date()) + '.png');
    $download[0].click();
  }
};
