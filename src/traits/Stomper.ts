import { Entity, Trait } from "../classes/Entity.js";

export class Stomper extends Trait {
  bounceSpeed: number = 400;
  onStomp: Function;

  constructor() {
    super("stomper");

    this.onStomp = function () {};
  }

  bounce(us: Entity, them: Entity) {
    us.bounds.bottom = them.bounds.top;
    us.vel.y = -this.bounceSpeed;
  }

  collides(us: Entity, them: Entity) {
    if (!them.killable || them.killable.dead) {
      return;
    }

    if (us.vel.y > them.vel.y) {
      this.bounce(us, them);
      this.onStomp(us, them);
    }
  }
}
