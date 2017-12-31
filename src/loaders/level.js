function* expandSpan(xStart, xLen, yStart, yLen){
  const xEnd = xStart + xLen;
  const yEnd = yStart + yLen;
  for(let x = xStart; x < xEnd; x++){
    for(let y = yStart; y < yEnd; y++){
      yield {x,y};
    }
  }
}

function expandRange(range) {
  if(range.length === 4) {
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

function* expandRanges(ranges) {
  for(const range of ranges) {
    yield* expandRange(range);
  }
}

function expandTiles(tiles, patterns){
  const expandedTiles = [];

  function walkTiles(tiles, offsetX, offsetY) {
    for(const tile of tiles) {
      for(const {x,y} of expandRanges(tile.ranges)) {
        const derivedX = x + offsetX;
          const derivedY = y + offsetY;

          if(tile.pattern) {
            const tiles = patterns[tile.pattern].tiles;
            walkTiles(tiles, derivedX, derivedY);
          } else {
            expandedTiles.push({
              tile,
              x: derivedX,
              y: derivedY
            });
          }
      }
    }
  }

  walkTiles(tiles, 0 ,0);

  return expandedTiles;
}

function createCollisionGrid(tiles, patterns) {
  const grid = new Matrix();

  for(const {tile, x, y} of expandTiles(tiles, patterns)) {
    grid.set(x, y, {type: tile.type});
  }

  return grid;
}

function createBackgroundGrid(tiles, patterns) {
  const grid = new Matrix();

  for(const {tile, x, y} of expandTiles(tiles, patterns)) {
    grid.set(x, y, {name: tile.name});
  }

  return grid;
}

function setupCollision(levelSpec, level) {
  const mergedTiles = levelSpec.layers.reduce((mergedTiles, layerSpec) => {
    return mergedTiles.concat(layerSpec.tiles);
  }, []);
  const collisionGrid = createCollisionGrid(mergedTiles, levelSpec.patterns);
  level.setCollisionGrid(collisionGrid);
}

function setupBackgrounds(levelSpec, level, tiles) {
  levelSpec.layers.forEach(layer => {
    const backgroundGrid = createBackgroundGrid(layer.tiles, levelSpec.patterns);
    const backgroundLayer = createBackgroundLayer(level, backgroundGrid, tiles);
    level.comp.layers.push(backgroundLayer);
  });
}

function setupEntities(levelSpec, level) {
  const spriteLayer = createSpriteLayer(level.entities);
  level.comp.layers.push(spriteLayer);
}

function loadLevel(name){
  return loadJSON(`levels/${name}.json`)
  .then(levelSpec => Promise.all([
    levelSpec,
    loadSpriteSheet(levelSpec.spritesheet)
  ]))
  .then(([levelSpec,tiles]) => {
    const level = new Level();

    setupCollision(levelSpec, level);
    setupBackgrounds(levelSpec, level, tiles);
    setupEntities(levelSpec, level);

    return level;
  });
}