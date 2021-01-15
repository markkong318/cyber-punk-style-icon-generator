
class ImageDrawAction {
  static apply(graphic, options) {
    const context = graphic.getContext();

    const {
      image,
      x = 0,
      y = 0,
      width = context.canvas.width,
      height = context.canvas.height,
    } = options;

    context.drawImage(image, x, y, width, height);

    return graphic;
  }
}

export default ImageDrawAction;
