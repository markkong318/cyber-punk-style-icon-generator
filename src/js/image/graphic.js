class Graphic {
  static create(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const graphic = new this({
      canvas,
    });

    return graphic;
  }

  constructor({ canvas }) {
    this.load(canvas);
  }

  load(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.width = this.context.canvas.width;
    this.height = this.context.canvas.height;
  }

  getCanvas() {
    return this.canvas;
  }

  getContext() {
    return this.context;
  }

  getImageData() {
    return this.getContext().getImageData(0, 0, this.width, this.height);
  }

  putImageData(imageData) {
    this.context.putImageData(imageData, 0, 0);
  }

  toDataURL() {
    return this.canvas.toDataURL('image/png');
  }
}

export default Graphic;
