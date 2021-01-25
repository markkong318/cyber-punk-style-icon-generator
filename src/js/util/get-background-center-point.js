const getBackgroundCenterPoint = (size, position) => {
  return [size[0] * 0.5 + position[0], size[1] * 0.5 + position[1]];
};

export default getBackgroundCenterPoint;
