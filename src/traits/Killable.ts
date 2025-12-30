import { Entity, Trait } from "../classes/Entity.js";
import { Level } from "../classes/Level.js";

export class Killable extends Trait {
  dead: boolean = false;
  deadTime: number = 0;
  removeAfter: number = 2;

  constructor() {
    super("killable");
  }

  kill() {
    this.queue(() => (this.dead = true));
  }

  revive() {
    this.dead = false;
    this.deadTime = 0;
  }

  update(entity: Entity, deltaTime: number, level: Level) {
    if (this.dead) {
      this.deadTime += deltaTime;
      if (this.deadTime > this.removeAfter) {
        this.queue(() => {
          level.entities.delete(entity);
        });
      }
    }
  }
}
