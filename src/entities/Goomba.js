function loadGoomba() {
  return loadSpriteSheet('goomba')
  .then(createGoombaFactory);
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

    goomba.addTrait({
      NAME: 'walk',
      speed: -30,
      obstruct(goomba, side) {
        if(side === Sides.LEFT || side === Sides.RIGHT) {
          this.speed = -this.speed;
        }
      },
      update(goomba) {
        goomba.vel.x = this.speed;
      }
    })

    return goomba;
  }
}