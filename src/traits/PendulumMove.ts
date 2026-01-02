import { Entity, Trait } from "../classes/Entity.js";
import { Sides } from "../misc/sides.js";

export class PendulumMove extends Trait {
  enabled: boolean = true;
  speed: number = -30;

  constructor() {
    super("pendulumMove");
  }

  obstruct(entity: Entity, side: Sides) {
    if (side === Sides.LEFT || side === Sides.RIGHT) {
      this.speed = -this.speed;
    }
  }

  update(entity: Entity) {
    if (this.enabled) {
      entity.vel.x = this.speed;
    }
  }
}
