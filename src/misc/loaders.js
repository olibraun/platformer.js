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
  return loadJSON(`levels/${name}.json`);
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
      tiles.define(tile.name,index[0],index[1]);
    });
    return tiles;
  });
}

// function loadLevel(name) {
//   return fetch(`/levels/${name}.json`)
//   .then(r => r.json());
// }