
const apply = (graphic, options) => {
  const context = graphic.getContext();

  const {
    image,
    x = 0,
    y = 0,
    width = context.canvas.width,
    height = context.canvas.height,
  } = options;

  context.rect(0, 0, context.canvas.width, context.canvas.height);
  context.fillStyle = "#CCCCCC";
  context.fill();
  context.drawImage(image, x, y, width, height);

  return graphic;
};

export default {
  apply,
};
