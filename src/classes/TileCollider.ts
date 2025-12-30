import { Matrix } from "../misc/math.js";
import { Sides } from "../misc/sides.js";
import { Entity } from "./Entity.js";
import { TileResolver } from "./TileResolver.js";

export class TileCollider {
  tiles: TileResolver;

  constructor(tileMatrix: Matrix) {
    this.tiles = new TileResolver(tileMatrix);
  }

  checkX(entity: Entity) {
    let x;
    if (entity.vel.x > 0) {
      x = entity.bounds.right;
    } else if (entity.vel.x < 0) {
      x = entity.bounds.left;
    } else {
      return;
    }

    const matches = this.tiles.searchByRange(
      x,
      x,
      entity.bounds.top,
      entity.bounds.bottom
    );

    matches.forEach((match) => {
      if (match.tile.type !== "ground") {
        return;
      }

      if (entity.vel.x > 0) {
        if (entity.bounds.right > match.x1) {
          entity.obstruct(Sides.RIGHT, match);
        }
      } else if (entity.vel.x < 0) {
        if (entity.bounds.left < match.x2) {
          entity.obstruct(Sides.LEFT, match);
        }
      }
    });
  }

  checkY(entity: Entity) {
    let y;
    if (entity.vel.y > 0) {
      y = entity.bounds.bottom;
    } else if (entity.vel.y < 0) {
      y = entity.bounds.top;
    } else {
      return;
    }

    const matches = this.tiles.searchByRange(
      entity.bounds.left,
      entity.bounds.right,
      y,
      y
    );

    matches.forEach((match) => {
      if (match.tile.type !== "ground") {
        return;
      }

      if (entity.vel.y > 0) {
        if (entity.bounds.bottom > match.y1) {
          entity.obstruct(Sides.BOTTOM, match);
        }
      } else if (entity.vel.y < 0) {
        if (entity.bounds.top < match.y2) {
          entity.obstruct(Sides.TOP, match);
        }
      }
    });
  }

  test(entity: Entity) {
    this.checkY(entity);
  }
}
