import pxToInt from "./px-to-int";

const getBackgroundSize = (string) => {
  const size = string.split(' ');
  return [pxToInt(size[0]), pxToInt(size[1])];
};

export default getBackgroundSize;
