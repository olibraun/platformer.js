//Platformer Mario

let spriteSpec;
let mariosmallsheet;
let mariosmall;
let global_graphics_scale = 3;

function preload(){
  spriteSpec = loadJSON("sprites/mario/mariosmall.json");
  mariosmall = loadImage("sprites/mario/mariosmall.png");
}

function setup() {
  createCanvas(16*16*global_graphics_scale,14*16*global_graphics_scale);

  mariosmallsheet = new SpriteSheet(image,spriteSpec.width,spriteSpec.height);
  for(let i=0; i<spriteSpec.sprites.length; i++){
    mariosmallsheet.define(spriteSpec.sprites[i],i,0);
  }
}

function draw() {
  background(134, 206, 253);
  mariosmallsheet.drawByIndex("jump-left",0,0);
  mariosmallsheet.drawByIndex("left-1",1,1);
  mariosmallsheet.drawByIndex("left-2",2,2);
  mariosmallsheet.drawByIndex("left-1",3,3);
  mariosmallsheet.drawByIndex("right-1",3,4);
  mariosmallsheet.drawByIndex("jump-right",4,4);
}