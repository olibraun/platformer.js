function loadKoopa() {
  return loadSpriteSheet('koopa')
  .then(createKoopaFactory);
}

function createKoopaFactory(sprite) {
  const walkAnim = sprite.animations.get('walk');

  function drawKoopa(context) {
    sprite.draw(walkAnim(this.lifetime), context, 0, 0);
  }

  return function createKoopa() {
    const koopa = new Entity();
    koopa.size.set(16, 16);

    koopa.draw = drawKoopa;

    koopa.addTrait({
      NAME: 'walk',
      speed: -30,
      obstruct(koopa, side) {
        if(side === Sides.LEFT || side === Sides.RIGHT) {
          this.speed = -this.speed;
        }
      },
      update(koopa) {
        koopa.vel.x = this.speed;
      }
    })

    return koopa;
  }
}