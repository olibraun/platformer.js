function createMario(){
  return loadMarioSpriteSheet()
  .then(marioSprites => {
  const mario = new Entity();
  mario.pos.set(64,180);
  mario.vel.set(2,-10);

  mario.draw = function drawMario(context){
    marioSprites.draw("idle",context,this.pos.x,this.pos.y);
  }

  mario.update = function updateMario(deltaTime){
    this.pos.x += this.vel.x * deltaTime;
    this.pos.y += this.vel.y * deltaTime;
  }

  return mario;
  });
}