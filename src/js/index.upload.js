import resizeDragger from "./util/resize-dragger";

import {
  $userImage,
  $loading,
  $uploading,
} from "./util/el";

$(function () {
  const dropZone = document.getElementById('drop');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);

  $('.uploadBtn').click(function () {
    $('#uploadInput').click();
  });
  $('#uploadInput').on('change', function () {
    const input = document.getElementById('uploadInput');
    loadImage(input.files);
  });
});

// drag image
function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  var files = evt.dataTransfer.files;
  loadImage(files);
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy';
}

// function
function loadImage(files) {
  var file, fr, img;
  if (!files) {
    alert('悲劇！您的瀏覽器不支援檔案上傳！');
  } else {
    $uploading.fadeIn();
    $loading.show();
    file = files[0];
    fr = new FileReader();
    fr.onload = createImage;
    fr.readAsDataURL(file);
  }

  function createImage() {
    img = new Image();
    img.onload = imageLoaded;
    img.src = fr.result;
  }

  function imageLoaded() {
    var canvas = document.getElementById("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var base64 = canvas.toDataURL("image/png");

    $('#source').attr('value', base64);
    $userImage.css('background-image', 'url(' + base64 + ')');

    var thumb = document.getElementById("thumb");
    var thumb_w, thumb_h;
    if (img.width > img.height) {
      thumb_h = 100;
      thumb_w = 100 * (img.width / img.height);
    } else {
      thumb_w = 100;
      thumb_h = 100 * (img.height / img.width);
    }
    thumb.width = thumb_w;
    thumb.height = thumb_h;

    ctx = thumb.getContext("2d");
    ctx.drawImage(img, 0, 0, thumb_w, thumb_h);
    var thumbbase64 = thumb.toDataURL("image/png");
    $('#templates label').css('background-image', 'url(' + thumbbase64 + ')');

    $('<img/>').attr('src', base64)
      .on('load', function () {
        var
          value = $('input[name=template]:checked').val(),
          container_size = $userImage.width(),
          userimage_size = [this.width, this.height];
        resizeDragger(userimage_size, container_size, value);

        $loading.hide();
        $uploading.fadeOut();
      });
  }
}
