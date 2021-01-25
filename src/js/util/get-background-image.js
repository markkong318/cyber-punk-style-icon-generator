
const getBackgroundImage = (element) => {
  var url = element.css('background-image');
  return url.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
};

export default getBackgroundImage;
