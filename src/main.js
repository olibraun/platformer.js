//Platformer Mario

//Globaler Vergrößerungsfaktor für die Grafiken
let global_graphics_scale = 2;

function preload(){
  return;
}

function setup() {
  createCanvas(16*16*global_graphics_scale,15*16*global_graphics_scale);
}

function draw() {
  getJSON("sprites/overworld.json").then(spec => Promise.all([
    spec,
    getImage(spec.imageURL)
  ]))
  // .then(([spec,img]) => {
  //   console.log(spec);
  //   console.log(img);
  // });
  .then(([spec,img]) => {
    const tiles = new SpriteSheet(img,spec.tileW,spec.tileH);
    spec.tiles.forEach(tile => {
      const index = tile.index;
      tiles.define(tile.name,index[0],index[1]);
    });
    tiles.drawByIndexRange("sky",0,16,0,15);
    tiles.drawByIndexRange("ground",0,16,13,2);
  });
}