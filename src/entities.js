function createMario(){
  return loadSpriteSheet('mario')
  .then(marioSprites => {
    const mario = new Entity();
    mario.size.set(14,16);

    mario.addTrait(new Go());
    mario.addTrait(new Jump());

    function routeFrame(mario){
      return 'idle';
    }

    mario.draw = function drawMario(context){
      marioSprites.draw(routeFrame(this), context, 0, 0);
    }

    return mario;
  });
}