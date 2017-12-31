const SLOW_DRAG = 1/1000;
const FAST_DRAG = 1/5000;

function loadMario(){
  return loadSpriteSheet('mario')
  .then(createMarioFactory);
}

function createMarioFactory(marioSprites) {
  const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 7);

  function routeFrame(mario){
    if(mario.jump.falling) {
      return 'jump';
    }
    if(mario.go.distance > 0) {
      if(mario.vel.x > 0 && mario.go.dir < 0 || mario.vel.x < 0 && mario.go.dir > 0){
        return "brake";
      }
      return runAnim(mario.go.distance);
    }
    return 'idle';
  }

  function setTurboState(turboOn) {
    this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
  }

  function drawMario(context){
    marioSprites.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
  }

  return function createMario() {
    const mario = new Entity();
    mario.size.set(14,16);

    mario.addTrait(new Go());
    mario.go.dragFactor = SLOW_DRAG;
    
    mario.addTrait(new Jump());

    mario.turbo = setTurboState;
    mario.draw = drawMario;

    return mario;
  }
}