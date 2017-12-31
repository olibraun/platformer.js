function loadKoopa() {
  return loadSpriteSheet('koopa')
  .then(createKoopaFactory);
}

function createKoopaFactory(sprite) {
  const walkAnim = sprite.animations.get('walk');

  function drawKoopa(context) {
    sprite.draw(walkAnim(this.lifetime), context, 0, 0, this.vel.x < 0);
  }

  return function createKoopa() {
    const koopa = new Entity();
    koopa.size.set(16, 16);

    koopa.draw = drawKoopa;

    koopa.addTrait(new PendulumWalk());

    return koopa;
  }
}