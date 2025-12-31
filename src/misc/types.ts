export type CollisionTile = { type: string };
export type BackgroundTile = { name: string };

export type TileBounds<TileType> = {
  tile: TileType;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};
