class PendulumWalk extends Trait {
  constructor() {
    super('pendukumWalk');
    this.speed = -30;
  }

  obstruct(entity, side) {
    if(side === Sides.LEFT || side === Sides.RIGHT) {
      this.speed = -this.speed;
    }
  }

  update(entity) {
    entity.vel.x = this.speed;
  }
}