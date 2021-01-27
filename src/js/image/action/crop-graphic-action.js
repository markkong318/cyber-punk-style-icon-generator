import Graphic from "../graphic";

class CropGraphicAction {
  static apply(graphic, options) {
    const context = graphic.getContext();
    const canvas = graphic.getCanvas();

    const {
      size = 0,
    } = options;

    const width = context.canvas.width - size;
    const height = context.canvas.height - size;

    const nextGraphic = Graphic.create(width, height);
    const nextContext = nextGraphic.getContext();

    nextContext.drawImage(canvas, - size / 2, - size / 2, context.canvas.width, context.canvas.height);

    graphic.load(nextGraphic.getCanvas());

    return graphic;
  }
}

export default CropGraphicAction;
