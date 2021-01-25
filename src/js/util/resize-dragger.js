const resizeDragger = (size, wrapper, value) => {
  const $userimage = $('#userimage .inner');
  const $dragger = $('#dragger');
  const $sizer = $('#size-slider');

  value = typeof value !== 'undefined' ? value : 1;

  let scale, width, height, top, left;
  if (size[0] > size[1]) {
    scale = (wrapper / size[1]);
    width = size[0] * scale;
    height = wrapper;
    top = 0;
    left = (width - wrapper) * 0.5 * -1;
  } else {
    scale = (wrapper / size[0]);
    width = wrapper;
    height = size[1] * scale;
    top = (height - wrapper) * 0.5 * -1;
    left = 0;
  }

  if (value === 6) {
    left = wrapper * 0.2 * -1;
    if (size[0] > size[1]) left -= (width - wrapper) * 0.5;
  } else if (value === 9) {
    $sizer.slider('value', 65);
    if (size[0] > size[1]) {
      left = wrapper * 0.65 * 0.13 * 0.5;
      width *= 0.65;
      height *= 0.65;
      top = (wrapper - height) * 0.48;
    } else {
      left = wrapper * 0.65 * 0.13 * 0.5;
      width *= 0.65;
      height *= 0.65;
      top = (wrapper - height) * 0.48;
    }
  } else if (value === 10) {
    $sizer.slider('value', 92);
    if (size[0] > size[1]) {
      width = wrapper * 0.92;
      height = width * (size[1] / size[0]);
      top = wrapper * 0.045;
      left = (wrapper - width) * 0.5;
    } else {
      width = width * 0.92;
      height = height * 0.92;
      top = wrapper * 0.045;
      left = (wrapper - width) * 0.5;
    }
  }

  $dragger
    .css('width', width + 'px').css('height', height + 'px')
    .css('top', top + 'px').css('left', left + 'px');

  $userimage
    .css('background-size', width + 'px ' + height + 'px')
    .css('background-position', left + 'px ' + top + 'px');
};

export default resizeDragger;

