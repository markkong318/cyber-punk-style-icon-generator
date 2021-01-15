import loadImages from "image-promise";
import GraphicCropAction from "./image/action/graphic-crop-action";
import GraphicFillAction from "./image/action/graphic-fill-action";
import RgbSplitAction from "./image/action/rgb-split-action";
import ImageDrawAction from "./image/action/image-draw-action";
import Graphic from "./image/graphic";

$(document).ready(function () {
  const $userimage = $('#userimage .inner');

  $("#normalSubmit").click(function () {
    const baseSize = $userimage.width();
    const size = getBackgroundSize($userimage.css('background-size'));
    const position = getBackgroundPosition($userimage.css('background-position'));
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

  ImageDrawAction.apply(graphic,{
    image: sourceImage,
    x,
    y,
    width: w,
    height: h,
  });

  RgbSplitAction.apply(graphic, {
    rOffset: 20,
    gOffset: -10,
    bOffset: 10,
  });

  GraphicCropAction.apply(graphic, {
    size: 100,
  });

  ImageDrawAction.apply(graphic,{ image: coverImage });

  const base64 = graphic.toDataURL();

  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ");

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./)) {
    let html = "<p>請按右鍵另存圖片</p>";
    html += "<img src='" + base64 + "' alt='10'/>";

    const tab = window.open();
    tab.document.write(html);
  } else {
    $('#download').attr('href', base64);
    $('#download').attr('download', (+new Date()) + '.png');
    $('#download')[0].click();
  }
};

function getBackgroundSize(string) {
  const size = string.split(' ');
  return [px2int(size[0]), px2int(size[1])];
}

function getBackgroundPosition(string) {
  const position = string.split(' ');
  return [px2int(position[0]), px2int(position[1])];
}

function px2int(string) {
  return parseFloat(string.replace('px', ''));
}
