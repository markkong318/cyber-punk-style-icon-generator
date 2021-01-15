class RgbSplitAction {
  static apply(graphic, options) {
    const imageData = graphic.getImageData();

    const { rOffset = 0, gOffset = 0, bOffset = 0 } = options;

    const originalArray = imageData.data;
    const newArray = new Uint8ClampedArray(originalArray);

    for (let i = 0; i < originalArray.length; i += 4) {
      newArray[i + 0 + rOffset * 4] = originalArray[i + 0]; // 🔴
      newArray[i + 1 + gOffset * 4] = originalArray[i + 1]; // 🟢
      newArray[i + 2 + bOffset * 4] = originalArray[i + 2]; // 🔵
    }

    graphic
      .getContext()
      .putImageData(new ImageData(newArray, imageData.width, imageData.height), 0, 0);

    return graphic;
  }
}

export default RgbSplitAction;
