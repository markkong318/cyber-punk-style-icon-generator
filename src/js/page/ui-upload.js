import render from "../util/render";
import {
  $baseImage,
  $loading,
  $uploading,
  $drop,
  $slider,
  $uploadButton,
  $uploadInput,
} from "../util/el";

$(function () {
  $drop.on('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();

    const files = e.dataTransfer.files;
    process(files);
  });

  $drop.on('drop', function(e)  {
    e.stopPropagation();
    e.preventDefault();

    const files = e.dataTransfer.files;
    process(files);
  });

  $uploadButton.click(function() {
    $uploadInput.click();
  });

  $uploadInput.on('change', function () {
    process(this.files);
  });
});

const process = (files) => {
  if (!files) {
    alert('Sorry your browser does not support upload');
    return;
  }

  $uploading.fadeIn();
  $loading.show();

  const file = files[0];
  const fr = new FileReader();
  fr.onload = async () => {
    await $baseImage.updateImage(fr.result);
    const img = $baseImage.getImage();

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

    render.preview();

    $loading.hide();
    $uploading.fadeOut();

    $slider.slider('value', 100);
  };

  fr.readAsDataURL(file);
};
