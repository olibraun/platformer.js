//Platformer Mario

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function loadMarioSpriteSheet(){
  return loadImage("img/characters.gif")
  .then(image => {
    const MarioSprite = new SpriteSheet(image,16,16);
    MarioSprite.define("idle",276,44,16,16);
    return MarioSprite;
  });
}

class Compositor{
  constructor(){
    this.layers = [];
  }

  draw(context){
    this.layers.forEach(layer => {
      layer(context);
    });
  }
}

function createBackgroundLayer(backgrounds,tiles){
  const buffer = document.createElement('canvas');
  buffer.width = canvas.width;
  buffer.height = canvas.height;

  backgrounds.forEach(background => {
    background.ranges.forEach(([x,xr,y,yr]) => {
      tiles.drawByIndexRange(background.name,buffer.getContext('2d'), x,xr,y,yr);
    });
  });

  return function drawBackgroundLayer(context){
    context.drawImage(buffer,0,0);
  };
}

loadLevel("1-1")
.then((levelSpec) => Promise.all([
  levelSpec,
  loadSpriteSheet(levelSpec.spritesheet),
  loadMarioSpriteSheet()
]))
.then(([levelSpec,tiles,marioSprites]) => {
  const comp = new Compositor();
  const backgroundLayer = createBackgroundLayer(levelSpec.backgrounds,tiles);
  comp.layers.push(backgroundLayer);  

  const pos = {
    x: 64,
    y: 64
  };

  function update() {
    //draw background from buffer
    comp.draw(context);
   
    //draw mario at pos
    marioSprites.draw("idle",context,pos.x,pos.y);

    pos.x += 2;
    pos.y += 2;
    requestAnimationFrame(update);
  }

  update();
});