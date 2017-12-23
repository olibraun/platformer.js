//Platformer Mario

//Globaler Vergrößerungsfaktor für die Grafiken
let global_graphics_scale = 3;

function preload(){
  //Load Specs
  mariosmallSpec = loadJSON("sprites/mario/mariosmall.json");
  ground1Spec = loadJSON("sprites/blocks/ground1.json");
  ground2Spec = loadJSON("sprites/blocks/ground2.json");

  //Load Images
  mariosmall = loadImage("sprites/mario/mariosmall.png");
  ground1 = loadImage("sprites/blocks/ground1.png");
  ground2 = loadImage("sprites/blocks/ground2.png");
}

function setup() {
  createCanvas(16*16*global_graphics_scale,14*16*global_graphics_scale);

  mariosmallSheet = new SpriteSheet(mariosmall,mariosmallSpec.width,mariosmallSpec.height);
  for(let i=0; i<mariosmallSpec.sprites.length; i++){
    mariosmallSheet.define(mariosmallSpec.sprites[i],i,0);
  }

  ground1Sheet = new SpriteSheet(ground1,ground1Spec.width,ground1Spec.height);
  for(let i=0; i<ground1Spec.sprites.length; i++){
    ground1Sheet.define(ground1Spec.sprites[i],i,0);
  }

  ground2Sheet = new SpriteSheet(ground2,ground2Spec.width,ground2Spec.height);
  for(let i=0; i<ground2Spec.sprites.length; i++){
    ground2Sheet.define(ground2Spec.sprites[i],i,0);
  }
}

function draw() {
  background(134, 206, 253);
  mariosmallSheet.drawByIndex("jump-left",0,0);
  mariosmallSheet.drawByIndex("left-1",1,1);
  mariosmallSheet.drawByIndex("left-2",2,2);
  mariosmallSheet.drawByIndex("left-1",3,3);
  mariosmallSheet.drawByIndex("right-1",3,4);
  mariosmallSheet.drawByIndex("jump-right",4,4);

  for(let i=0; i<16; i++){
    ground1Sheet.drawByIndex("ground1",i,12);
    ground2Sheet.drawByIndex("ground2",i,13);
  }
}

//Globale Variablen
//Für Bilder
let mariosmall;
let ground1;
let ground2;

//Für Specs
let mariosmallSpec;
let ground1Spec;
let ground2Spec;

//Für Spritesheets
let mariosmallSheet;
let ground1Sheet;
let ground2Sheet;