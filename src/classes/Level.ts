import { Matrix } from "../misc/math";
import { CollisionTile } from "../misc/types";
import { Compositor } from "./Compositor.js";
import { Entity } from "./Entity.js";
import { EntityCollider } from "./EntityCollider.js";
import { TileCollider } from "./TileCollider.js";

export class Level {
  gravity: number = 1500;
  totalTime: number = 0;
  comp: Compositor = new Compositor();
  entities: Set<Entity> = new Set();
  tileCollider: TileCollider | null = null;
  entityCollider: EntityCollider;

  constructor() {
    this.entityCollider = new EntityCollider(this.entities);
  }

  setCollisionGrid(matrix: Matrix<CollisionTile>) {
    this.tileCollider = new TileCollider(matrix);
  }

  update(deltaTime: number) {
    this.entities.forEach((entity) => {
      entity.update(deltaTime, this);
    });

    this.entities.forEach((entity) => {
      this.entityCollider.check(entity);
    });

    this.entities.forEach((entity) => {
      entity.finalize();
    });

    this.totalTime += deltaTime;
  }
}
