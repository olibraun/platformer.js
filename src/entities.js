function createMario(){
  return loadMarioSpriteSheet()
  .then(marioSprites => {
  const mario = new Entity();

  mario.draw = function drawMario(context){
    marioSprites.draw("idle",context,this.pos.x,this.pos.y);
  }

  mario.addTrait(new Velocity());

  return mario;
  });
}