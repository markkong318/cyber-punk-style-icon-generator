
const getBackgroundImage = (element) => {
  const url = element.css('background-image');
  return url.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
};

export default getBackgroundImage;
