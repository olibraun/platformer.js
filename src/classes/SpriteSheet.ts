export class SpriteSheet {
  image: HTMLImageElement;
  width: number;
  height: number;
  tiles: Map<string, HTMLCanvasElement[]> = new Map();
  animations: Map<string, Function> = new Map();

  constructor(image: HTMLImageElement, width?: number, height?: number) {
    this.image = image;
    this.width = width ? width : 0;
    this.height = height ? height : 0;
  }

  defineAnim(name: string, animation: Function) {
    this.animations.set(name, animation);
  }

  define(name: string, x: number, y: number, width: number, height: number) {
    const buffers: HTMLCanvasElement[] = [false, true].map((flip) => {
      const buffer: HTMLCanvasElement = document.createElement("canvas");
      buffer.width = width;
      buffer.height = height;

      const context: CanvasRenderingContext2D = buffer.getContext("2d")!;

      if (flip) {
        context.scale(-1, 1);
        context.translate(-width, 0);
      }

      context.drawImage(this.image, x, y, width, height, 0, 0, width, height);

      return buffer;
    });

    this.tiles.set(name, buffers);
  }

  defineTile(name: string, row_index: number, col_index: number) {
    this.define(
      name,
      this.width * row_index,
      this.height * col_index,
      this.width,
      this.height
    );
  }

  draw(
    name: string,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    flip: boolean = false
  ) {
    const buffer = this.tiles.get(name)![flip ? 1 : 0];
    context.drawImage(buffer, x, y);
  }

  drawAnim(
    name: string,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    distance: any
  ) {
    const animation = this.animations.get(name)!;
    this.drawByIndex(animation(distance), context, x, y);
  }

  drawByIndex(
    name: string,
    context: CanvasRenderingContext2D,
    row_index: number,
    col_index: number
  ) {
    this.draw(name, context, row_index * this.width, col_index * this.height);
  }

  drawByIndexRange(
    name: string,
    context: CanvasRenderingContext2D,
    row_index: number,
    row_len: number,
    col_index: number,
    col_len: number
  ) {
    for (let i = row_index; i < row_index + row_len; i++) {
      for (let j = col_index; j < col_index + col_len; j++) {
        this.drawByIndex(name, context, i, j);
      }
    }
  }
}
