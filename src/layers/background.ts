import { Camera } from "../classes/Camera.js";
import { Level } from "../classes/Level.js";
import { SpriteSheet } from "../classes/SpriteSheet.js";
import { TileResolver } from "../classes/TileResolver.js";
import { Matrix } from "../misc/math.js";
import { BackgroundTile } from "../misc/types.js";

export function createBackgroundLayer(
  level: Level,
  tiles: Matrix<BackgroundTile>,
  sprites: SpriteSheet
) {
  const resolver = new TileResolver(tiles);

  const buffer: HTMLCanvasElement = document.createElement("canvas");
  buffer.width = 256 + 16;
  buffer.height = 240;

  const context: CanvasRenderingContext2D = buffer.getContext("2d")!;

  function redraw(startIndex: number, endIndex: number) {
    context.clearRect(0, 0, buffer.width, buffer.height);
    for (let x = startIndex; x <= endIndex; ++x) {
      const col = tiles.grid[x];
      if (col) {
        col.forEach((tile, y) => {
          if (sprites.animations.has(tile.name)) {
            sprites.drawAnim(
              tile.name,
              context,
              x - startIndex,
              y,
              level.totalTime
            );
          } else {
            sprites.drawByIndex(tile.name, context, x - startIndex, y);
          }
        });
      }
    }
  }

  return function drawBackgroundLayer(
    context: CanvasRenderingContext2D,
    camera: Camera
  ) {
    const drawWidth = resolver.toIndex(camera.size.x);
    const drawFrom = resolver.toIndex(camera.pos.x);
    const drawTo = drawFrom + drawWidth;

    redraw(drawFrom, drawTo);

    context.drawImage(buffer, -camera.pos.x % 16, -camera.pos.y);
  };
}
