import loadImages from "image-promise";
import rgbSplit from "./filter/rgb-split";

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
  const renderWidth = 600;
  const renderHeight = 600;

  const sourceImage = await loadImages(source);

  // const resizeCanvas = document.getElementById("result");
  // resizeCanvas.width = 500;
  // resizeCanvas.height = 500;

  const renderCanvas = document.createElement('canvas');
  renderCanvas.width = renderWidth;
  renderCanvas.height = renderHeight;

  const ctx = renderCanvas.getContext("2d");
  ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#CCCCCC";
  ctx.fill();
  ctx.drawImage(sourceImage, x, y, w, h);

  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const updatedImageData = rgbSplit.filter(imageData, {
    rOffset: 20,
    gOffset: -10,
    bOffset: 10
  });

  ctx.putImageData(updatedImageData, 0, 0);

  const cover = await loadImages('images/object/' + template + '.png');
  ctx.drawImage(cover, (ctx.canvas.width - cover.width) / 2, (ctx.canvas.height - cover.height) / 2, cover.width, cover.height);

  const base64 = renderCanvas.toDataURL("image/png");

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
