const getImgSize = (src) => {
  const newImg = new Image();
  newImg.src = src;

  return [newImg.width, newImg.height];
};

export default getImgSize;
