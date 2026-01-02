import { Level } from "../classes/Level.js";
import { SpriteSheet } from "../classes/SpriteSheet.js";
import { EntityFactories } from "../entities.js";
import { createBackgroundLayer } from "../layers/background.js";
import { createSpriteLayer } from "../layers/sprites.js";
import { LevelSpecDTO, PatternDTO, TilesDTO } from "../misc/DTO.js";
import { loadJSON, loadSpriteSheet } from "../misc/loaders.js";
import { Matrix } from "../misc/math.js";
import { BackgroundTile, CollisionTile } from "../misc/types.js";

function* expandSpan(
  xStart: number,
  xLen: number,
  yStart: number,
  yLen: number
): Generator<
  {
    x: number;
    y: number;
  },
  void,
  unknown
> {
  const xEnd = xStart + xLen;
  const yEnd = yStart + yLen;
  for (let x = xStart; x < xEnd; x++) {
    for (let y = yStart; y < yEnd; y++) {
      yield { x, y };
    }
  }
}

function expandRange(range: number[]):
  | Generator<
      {
        x: number;
        y: number;
      },
      void,
      unknown
    >
  | undefined {
  if (range.length === 4) {
    const [x1, x2, y1, y2] = range;
    return expandSpan(x1, x2, y1, y2);
  } else if (range.length === 3) {
    const [x1, x2, y1] = range;
    return expandSpan(x1, x2, y1, 1);
  } else if (range.length === 2) {
    const [x1, y1] = range;
    return expandSpan(x1, 1, y1, 1);
  }
}

function* expandRanges(ranges: number[][]): Generator<
  {
    x: number;
    y: number;
  },
  void,
  unknown
> {
  for (const range of ranges) {
    yield* expandRange(range)!;
  }
}

function* expandTiles(
  tiles: TilesDTO[],
  patterns: PatternDTO
): Generator<any, void, any> {
  function* walkTiles(
    tiles: TilesDTO[],
    offsetX: number,
    offsetY: number
  ): Generator<{}> {
    for (const tile of tiles) {
      for (const { x, y } of expandRanges(tile.ranges)) {
        const derivedX = x + offsetX;
        const derivedY = y + offsetY;
        if (tile.pattern) {
          const tiles = patterns[tile.pattern].tiles;
          yield* walkTiles(tiles, derivedX, derivedY);
        } else {
          yield {
            tile,
            x: derivedX,
            y: derivedY,
          };
        }
      }
    }
  }

  yield* walkTiles(tiles, 0, 0);
}

function createCollisionGrid(
  tiles: TilesDTO[],
  patterns: {}
): Matrix<CollisionTile> {
  const grid = new Matrix<CollisionTile>();

  for (const { tile, x, y } of expandTiles(tiles, patterns)) {
    grid.set(x, y, { type: tile.type });
  }

  return grid;
}

function createBackgroundGrid(
  tiles: TilesDTO[],
  patterns: {}
): Matrix<BackgroundTile> {
  const grid = new Matrix<BackgroundTile>();

  for (const { tile, x, y } of expandTiles(tiles, patterns)) {
    grid.set(x, y, { name: tile.name });
  }

  return grid;
}

function setupCollision(levelSpec: LevelSpecDTO, level: Level) {
  const mergedTiles: TilesDTO[] = levelSpec.layers.reduce(
    (mergedTiles, layerSpec) => {
      return mergedTiles.concat(layerSpec.tiles);
    },
    [] as TilesDTO[]
  );
  const collisionGrid = createCollisionGrid(mergedTiles, levelSpec.patterns);
  level.setCollisionGrid(collisionGrid);
}

function setupBackgrounds(
  levelSpec: LevelSpecDTO,
  level: Level,
  tiles: SpriteSheet
) {
  levelSpec.layers.forEach((layer) => {
    const backgroundGrid = createBackgroundGrid(
      layer.tiles,
      levelSpec.patterns
    );
    const backgroundLayer = createBackgroundLayer(level, backgroundGrid, tiles);
    level.comp.layers.push(backgroundLayer);
  });
}

function setupEntities(
  levelSpec: LevelSpecDTO,
  level: Level,
  entityFactory: EntityFactories
) {
  levelSpec.entities.forEach(({ name, pos: [x, y] }) => {
    const createEntity = entityFactory[name];
    const entity = createEntity();
    entity.pos.set(x, y);
    level.entities.add(entity);
  });

  const spriteLayer = createSpriteLayer(level.entities);
  level.comp.layers.push(spriteLayer);
}

export function createLevelLoader(entityFactory: EntityFactories) {
  return function loadLevel(name: string) {
    return loadJSON(`levels/${name}.json`)
      .then((levelSpec) =>
        Promise.all([levelSpec, loadSpriteSheet(levelSpec.spritesheet)])
      )
      .then(([levelSpec, tiles]) => {
        const level = new Level();

        setupCollision(levelSpec, level);
        setupBackgrounds(levelSpec, level, tiles);
        setupEntities(levelSpec, level, entityFactory);

        return level;
      });
  };
}
