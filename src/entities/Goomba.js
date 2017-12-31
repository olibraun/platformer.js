function loadGoomba() {
  return loadSpriteSheet('goomba')
  .then(createGoombaFactory);
}

class GoombaBehavior extends Trait {
  constructor() {
    super('behavior');
  }

  collides(us, them) {
    if(us.killable.dead) {
      return;
    }

    if(them.stomper) {
      if (them.vel.y > us.vel.y) {
        us.killable.kill();
        us.pendulumMove.speed = 0;
      } else {
        them.killable.kill();
      }
    }
  }
}

function createGoombaFactory(sprite) {
  const walkAnim = sprite.animations.get('walk');

  function routeAnim(goomba) {
    if(goomba.killable.dead) {
      return 'flat';
    }

    return walkAnim(goomba.lifetime)
  }

  function drawGoomba(context) {
    sprite.draw(routeAnim(this), context, 0, 0);
  }

  return function createGoomba() {
    const goomba = new Entity();
    goomba.size.set(16, 16);

    goomba.draw = drawGoomba;

    goomba.addTrait(new Solid());
    goomba.addTrait(new Physics());
    goomba.addTrait(new PendulumMove());
    goomba.addTrait(new GoombaBehavior());
    goomba.addTrait(new Killable());

    return goomba;
  }
}