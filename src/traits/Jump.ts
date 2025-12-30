import { Entity, Trait } from "../classes/Entity.js";
import { Sides } from "../misc/sides.js";

export class Jump extends Trait {
  ready: number = 0;
  duration: number = 0.3;
  velocity: number = 200;
  engageTime: number = 0;
  requestTime: number = 0;
  gracePeriod: number = 0.1;
  speedBoost: number = 0.3;

  constructor() {
    super("jump");
  }

  get falling() {
    return this.ready < 0;
  }

  start() {
    this.requestTime = this.gracePeriod;
  }

  cancel() {
    this.engageTime = 0;
    this.requestTime = 0;
  }

  obstruct(entity: Entity, side: Sides) {
    if (side === Sides.BOTTOM) {
      this.ready = 1;
    } else if (side === Sides.TOP) {
      this.cancel();
    }
  }

  update(entity: Entity, deltaTime: number) {
    if (this.requestTime > 0) {
      if (this.ready > 0) {
        this.engageTime = this.duration;
        this.requestTime = 0;
      }
      this.requestTime -= deltaTime;
    }
    if (this.engageTime > 0) {
      entity.vel.y = -(
        this.velocity +
        Math.abs(entity.vel.x) * this.speedBoost
      );
      this.engageTime -= deltaTime;
    }

    this.ready--;
  }
}
