//Platformer Mario

//Globaler Vergrößerungsfaktor für die Grafiken
let global_graphics_scale = 3;

function preload(){
  //Load Images
  img_sprites = loadImage("img/characters.gif");
  img_tiles = loadImage("img/tiles.png");

  //Load sprites
  overworld = loadJSON("sprites/overworld.json");
}

function setup() {
  createCanvas(16*16*global_graphics_scale,15*16*global_graphics_scale);

  sprites = new SpriteSheet(img_sprites,16,16);
  tiles = new SpriteSheet(img_tiles,overworld.tileW,overworld.tileH);

  overworld.tiles.forEach(tile => {
    const index = tile.index;
    tiles.define(tile.name,index[0],index[1]);
  });
}

function draw() {
  tiles.drawByIndex("ground",0,0);
  tiles.drawByIndex("sky",1,1);
  tiles.drawByIndex("chocolate",2,2);
  tiles.drawByIndex("bricks",3,3);
}

//Globale Variablen
//Für Bilder
let img_sprites;
let img_tiles;

//Für Specs
let overworld;
let underworld;

//Für Spritesheets
let sprites;
let tiles;