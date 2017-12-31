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
        them.stomper.bounce();
        us.pendulumWalk.speed = 0;
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

    goomba.addTrait(new PendulumWalk());
    goomba.addTrait(new GoombaBehavior());
    goomba.addTrait(new Killable());

    return goomba;
  }
}