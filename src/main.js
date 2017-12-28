//Platformer Mario

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

loadJSON("sprites/overworld.json").then(spec => Promise.all([
  spec,
  loadImage(spec.imageURL)
]))
.then(([spec,img]) => {
  const tiles = new SpriteSheet(img,spec.tileW,spec.tileH);
  spec.tiles.forEach(tile => {
    const index = tile.index;
    tiles.define(tile.name,index[0],index[1]);
  });
  tiles.drawByIndexRange("sky",context,0,16,0,15);
  tiles.drawByIndexRange("ground",context,0,16,13,2);
});