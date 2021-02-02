import resizeDragger from "./util/resize-dragger";

import {
  $previewImage,
  $loading,
  $uploading,
  $drop,
  $slider,
} from "./util/el";

$(function () {
  $drop.on('dragover', (e) => {
    e.stopPropagation();
    e.preventDefault();

    const files = e.dataTransfer.files;
    loadImage(files);
  }, false);

  $drop.on('drop', (e) => {
    e.stopPropagation();
    e.preventDefault();

    const files = e.dataTransfer.files;
    loadImage(files);
  }, false);

  $('.uploadBtn').click(function () {
    $('#uploadInput').click();
  });

  $('#uploadInput').on('change', function () {
    loadImage($('#uploadInput')[0].files);
  });
});

const loadImage = (files) => {
  if (!files) {
    alert('悲劇！您的瀏覽器不支援檔案上傳！');
    return;
  }

  $uploading.fadeIn();
  $loading.show();

  const file = files[0];
  const fr = new FileReader();
  fr.onload = async () => {
    await $previewImage.updateImage(fr.result);
    const img = $previewImage.getImage();

    const thumb = document.createElement('canvas');

    let thumb_w, thumb_h;
    if (img.width > img.height) {
      thumb_h = 100;
      thumb_w = 100 * (img.width / img.height);
    } else {
      thumb_w = 100;
      thumb_h = 100 * (img.height / img.width);
    }
    thumb.width = thumb_w;
    thumb.height = thumb_h;

    const thumbCtx = thumb.getContext("2d");
    thumbCtx.drawImage(img, 0, 0, thumb_w, thumb_h);

    const thumbBase64 = thumb.toDataURL("image/png");
    $('#templates label').css('background-image', 'url(' + thumbBase64 + ')');

    resizeDragger();

    $loading.hide();
    $uploading.fadeOut();

    $slider.slider('value', 100);
  };

  fr.readAsDataURL(file);
};
