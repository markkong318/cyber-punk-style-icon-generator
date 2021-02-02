class Size {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toArray() {
    return [this.width, this.height];
  }
}

export default Size;
