class ShiftXAction {
  static apply(graphic, options) {
    const imageData = graphic.getImageData();

    const {
      yStart = 0,
      yEnd = 0,
      xOffset = 0,
    } = options;

    const originalArray = imageData.data;
    const newArray = new Uint8ClampedArray(originalArray);

    for (let y = yStart; y < yEnd; y++) {
      for (let x = 0; x < graphic.width; x++) {
        const pos = (y * graphic.width + x) * 4;

        newArray[pos + 0 + xOffset * 4] = originalArray[pos + 0]; // 🔴
        newArray[pos + 1 + xOffset * 4] = originalArray[pos + 1]; // 🟢
        newArray[pos + 2 + xOffset * 4] = originalArray[pos + 2]; // 🔵
      }
    }

    graphic
      .getContext()
      .putImageData(new ImageData(newArray, imageData.width, imageData.height), 0, 0);

    return graphic;
  }
}

export default ShiftXAction;
