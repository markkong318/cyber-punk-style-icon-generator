
class FillGraphicAction {
  static apply(graphic, options) {
    const context = graphic.getContext();

    const {
      color = '#000000',
    } = options;

    context.rect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = color;
    context.fill();

    return graphic;
  }
}

export default FillGraphicAction;
