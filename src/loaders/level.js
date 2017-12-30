function createTiles(level, tiles, patterns, offsetX = 0, offsetY = 0){
  function applyRange(tile, x1, x2, y1, y2) {
    for(let x = x1; x < x1+x2; x++){
      for(let y = y1; y < y1+y2; y++){
        const derivedX = x + offsetX;
        const derivedY = y + offsetY;

        if(tile.pattern) {
          const tiles = patterns[tile.pattern].tiles;
          createTiles(level, tiles, patterns, derivedX, derivedY);
        } else {
          level.tiles.set(derivedX, derivedY, {
            name: tile.name,
            type: tile.type
          });
        }
      }
    }
  }

  tiles.forEach(tile => {
    tile.ranges.forEach(range => {
      if(range.length === 4) {
        const [x1, x2, y1, y2] = range;
        applyRange(tile, x1, x2, y1, y2);
      } else if (range.length === 3) {
        const [x1, x2, y1] = range;
        applyRange(tile, x1, x2, y1, 1);
      } else if (range.length === 2) {
        const [x1, y1] = range;
        applyRange(tile, x1, 1, y1, 1);
      }
    });
  });
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