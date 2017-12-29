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

function loadLevel(name){
  return loadJSON(`levels/${name}.json`)
  .then(levelSpec => Promise.all([
    levelSpec,
    loadSpriteSheet(levelSpec.spritesheet)
  ]))
  .then(([levelSpec,tiles]) => {
    const level = new Level();

    const backgroundLayer = createBackgroundLayer(levelSpec.backgrounds,tiles);
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
    spec.tiles.forEach(tile => {
      const index = tile.index;
      tiles.defineTile(tile.name,index[0],index[1]);
    });
    return tiles;
  });
}

function loadMarioSpriteSheet(){
  return loadImage("img/characters.gif")
  .then(image => {
    const MarioSprite = new SpriteSheet(image,16,16);
    MarioSprite.define("idle",276,44,16,16);
    return MarioSprite;
  });
}

// function loadLevel(name) {
//   return fetch(`/levels/${name}.json`)
//   .then(r => r.json());
// }