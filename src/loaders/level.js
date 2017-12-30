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
    for(const item of expandRange(range)) {
      yield item;
    }
  }
}

function createTiles(level, tiles, patterns){
  function walkTiles(tiles, offsetX, offsetY) {
    for(const tile of tiles) {
      for(const {x,y} of expandRanges(tile.ranges)) {
        const derivedX = x + offsetX;
          const derivedY = y + offsetY;

          if(tile.pattern) {
            const tiles = patterns[tile.pattern].tiles;
            walkTiles(tiles, derivedX, derivedY);
          } else {
            level.tiles.set(derivedX, derivedY, {
              name: tile.name,
              type: tile.type
            });
          }
      }
    }
  }

  walkTiles(tiles, 0 ,0);
}

function loadLevel(name){
  return loadJSON(`levels/${name}.json`)
  .then(levelSpec => Promise.all([
    levelSpec,
    loadSpriteSheet(levelSpec.spritesheet)
  ]))
  .then(([levelSpec,tiles]) => {
    const level = new Level();
    createTiles(level, levelSpec.tiles, levelSpec.patterns);

    const backgroundLayer = createBackgroundLayer(level,tiles);
    level.comp.layers.push(backgroundLayer);
    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);

    return level;
  });
}