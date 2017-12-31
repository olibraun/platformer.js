function loadGoomba() {
  return loadSpriteSheet('goomba')
  .then(createGoombaFactory);
}

class GoombaBehavior extends Trait {
  constructor() {
    super('behavior');
  }

  collides(us, them) {
    if(them.stomper) {
      us.pendulumWalk.speed = 0;
    }
  }
}

function createGoombaFactory(sprite) {
  const walkAnim = sprite.animations.get('walk');

  function drawGoomba(context) {
    sprite.draw(walkAnim(this.lifetime), context, 0, 0);
  }

  return function createGoomba() {
    const goomba = new Entity();
    goomba.size.set(16, 16);

    goomba.draw = drawGoomba;

    goomba.addTrait(new PendulumWalk());
    goomba.addTrait(new GoombaBehavior());

    return goomba;
  }
}