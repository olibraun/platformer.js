//Platformer Mario

let spriteSpec;
let mariosmallsheet;
let mariosmall;

function preload(){
  spriteSpec = loadJSON("sprites/mario/mariosmall.json");
  mariosmall = loadImage("sprites/mario/mariosmall.png");
}

class SpriteSheet{
  constructor(image,width,height){
    this.image = mariosmall;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
  }

  define(name,row_index,col_index){
    const buffer = createGraphics(this.width,this.height);
    buffer.image(this.image,row_index*this.width,col_index*this.height,buffer.width,buffer.height,0,0,this.width,this.height);
    this.tiles.set(name,buffer);
    console.log(this.tiles);
  }

  drawByIndex(name,row_index,col_index){
    const buffer = this.tiles.get(name);
    image(buffer,row_index*this.width,col_index*this.height);
  }
}

function setup() {
  createCanvas(800,640);

  mariosmallsheet = new SpriteSheet(image,spriteSpec.width,spriteSpec.height);
  for(let i=0; i<spriteSpec.sprites.length; i++){
    mariosmallsheet.define(spriteSpec.sprites[i],0,i);
  }
}

function draw() {
  background(134, 206, 253);
  mariosmallsheet.drawByIndex("left-1",3,3);
  mariosmallsheet.drawByIndex("left-1",3,4);
  image(mariosmall,4*16,4*16,16,16,0,0,16,16);
}