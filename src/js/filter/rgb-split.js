
const filter = (imageData, options) => {
  const { rOffset = 0, gOffset = 0, bOffset = 0 } = options;

  const originalArray = imageData.data;
  const newArray = new Uint8ClampedArray(originalArray);

  for (let i = 0; i < originalArray.length; i += 4) {
    newArray[i + 0 + rOffset * 4] = originalArray[i + 0]; // 🔴
    newArray[i + 1 + gOffset * 4] = originalArray[i + 1]; // 🟢
    newArray[i + 2 + bOffset * 4] = originalArray[i + 2]; // 🔵
  }

  return new ImageData(newArray, imageData.width, imageData.height);
};

export default {
  filter,
};
