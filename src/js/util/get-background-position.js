import pxToInt from "./px-to-int";

const getBackgroundPosition = (string) => {
  const position = string.split(' ');
  return [pxToInt(position[0]), pxToInt(position[1])];
};

export default getBackgroundPosition;
