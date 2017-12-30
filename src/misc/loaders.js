function loadImage(url) {
  return new Promise(resolve => {
      const image = new Image();
      image.addEventListener('load', () => {
          resolve(image);
      });
      image.src = url;
  });
}

function loadJSON(url){
  return fetch(url)
  .then(r => r.json());
}

function createTiles(level, backgrounds, patterns, offsetX = 0, offsetY = 0){
  function applyRange(background, x1, x2, y1, y2) {
    for(let x = x1; x < x1+x2; x++){
      for(let y = y1; y < y1+y2; y++){
        const derivedX = x + offsetX;
        const derivedY = y + offsetY;

        if(background.pattern) {
          const backgrounds = patterns[background.pattern].backgrounds;
          createTiles(level, backgrounds, patterns, derivedX, derivedY);
        } else {
          level.tiles.set(derivedX, derivedY, {
            name: background.name,
            type: background.type
          });
        }
      }
    }
  }

  backgrounds.forEach(background => {
    background.ranges.forEach(range => {
      if(range.length === 4) {
        const [x1, x2, y1, y2] = range;
        applyRange(background, x1, x2, y1, y2);
      } else if (range.length === 3) {
        const [x1, x2, y1] = range;
        applyRange(background, x1, x2, y1, 1);
      } else if (range.length === 2) {
        const [x1, y1] = range;
        applyRange(background, x1, 1, y1, 1);
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
    createTiles(level, levelSpec.backgrounds, levelSpec.patterns);

    const backgroundLayer = createBackgroundLayer(level,tiles);
    level.comp.layers.push(backgroundLayer);
    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);

    return level;
  });
}

function loadSpriteSheet(name){
  return loadJSON(`sprites/${name}.json`).then(spec => Promise.all([
    spec,
    loadImage(spec.imageURL)
  ]))
  .then(([spec,img]) => {
    const tiles = new SpriteSheet(img,spec.tileW,spec.tileH);
    if(spec.tiles){
      spec.tiles.forEach(tile => {
        const index = tile.index;
        tiles.defineTile(tile.name,index[0],index[1]);
      });
    }

    if(spec.frames){
      spec.frames.forEach(frameSpec => {
        tiles.define(frameSpec.name, ...frameSpec.rect);
      });
    }

    if(spec.animations){
      spec.animations.forEach(animSpec => {
        const animation = createAnim(animSpec.frames, animSpec.frameLen);
        tiles.defineAnim(animSpec.name, animation);
      });
    }
    
    return tiles;
  });
}