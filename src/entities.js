function createMario(){
  return loadSpriteSheet('mario')
  .then(marioSprites => {
    const mario = new Entity();
    mario.size.set(14,16);

    mario.draw = function drawMario(context){
      marioSprites.draw('run-1', context, 0, 0);
    }

    mario.addTrait(new Go());
    mario.addTrait(new Jump());

    return mario;
  });
}