export class Vec2 {
  x: number = 0;
  y: number = 0;

  constructor(x: number, y: number) {
    this.set(x, y);
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Matrix<TileType> {
  grid: TileType[][] = [];

  forEach(callback: (value: TileType, x: number, y: number) => void) {
    this.grid.forEach((column, x) => {
      column.forEach((value, y) => {
        callback(value, x, y);
      });
    });
  }

  set(x: number, y: number, value: TileType) {
    if (!this.grid[x]) {
      this.grid[x] = [];
    }

    this.grid[x][y] = value;
  }

  get(x: number, y: number): TileType | undefined {
    const col = this.grid[x];
    if (col) {
      return col[y];
    }
    return undefined;
  }
}
