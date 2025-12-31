import { Entity, Trait } from "../classes/Entity.js";
import { Level } from "../classes/Level.js";

export class Physics extends Trait {
  constructor() {
    super("physics");
  }

  update(entity: Entity, deltaTime: number, level: Level) {
    entity.pos.x += entity.vel.x * deltaTime;
    level.tileCollider!.checkX(entity);

    entity.pos.y += entity.vel.y * deltaTime;
    level.tileCollider!.checkY(entity);

    entity.vel.y += level.gravity * deltaTime;
  }
}
