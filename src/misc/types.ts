export type Tile = { type?: string; name: string };

export type TileBounds = {
  tile: Tile;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};
