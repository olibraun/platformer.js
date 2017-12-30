function createMario(){
  return loadSpriteSheet('mario')
  .then(marioSprites => {
    const mario = new Entity();
    mario.size.set(14,16);

    mario.addTrait(new Go());
    mario.addTrait(new Jump());

    const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 10);

    function routeFrame(mario){
      if(mario.go.dir !== 0){
        return runAnim(mario.go.distance);
      }
      return 'idle';
    }

    mario.draw = function drawMario(context){
      marioSprites.draw(routeFrame(this), context, 0, 0);
    }

    return mario;
  });
}