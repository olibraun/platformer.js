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

loadLevel("1-1")
.then((levelSpec) => Promise.all([
  levelSpec,
  loadSpriteSheet(levelSpec.spritesheet),
  loadMarioSpriteSheet()
]))
.then(([levelSpec,tiles,marioSprites]) => {
  const gravity = 0.5;
  const comp = new Compositor();
  const backgroundLayer = createBackgroundLayer(levelSpec.backgrounds,tiles);
  comp.layers.push(backgroundLayer);  

  const mario = new Entity();
  mario.pos.set(64,180);
  mario.vel.set(2,-10);

  mario.draw = function drawMario(context){
    marioSprites.draw("idle",context,this.pos.x,this.pos.y);
  }

  mario.update = function updateMario(){
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  function update() {
    //draw background from buffer
    comp.draw(context);
    mario.draw(context);

    mario.update();
    mario.vel.y += gravity;
    requestAnimationFrame(update);
  }

  update();
});