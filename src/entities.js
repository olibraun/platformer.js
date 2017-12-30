function createMario(){
  return loadMarioSpriteSheet()
  .then(marioSprites => {
  const mario = new Entity();
  mario.size.set(14,16);

  mario.draw = function drawMario(context){
    marioSprites.draw("idle",context,this.pos.x,this.pos.y);
  }

  mario.addTrait(new Go());
  mario.addTrait(new Jump());
  mario.addTrait(new Velocity());

  return mario;
  });
}