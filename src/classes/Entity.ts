import { Vec2 } from "../misc/math.js";
import { Sides } from "../misc/sides.js";
import { TileBounds } from "../misc/types.js";
import { BoundingBox } from "./BoundingBox.js";
import { Level } from "./Level.js";

export class Trait {
  NAME: string;
  tasks: Function[] = [];

  constructor(name: string) {
    this.NAME = name;
  }

  finalize() {
    this.tasks.forEach((task) => task());
    this.tasks.length = 0;
  }

  queue(task: Function) {
    this.tasks.push(task);
  }

  obstruct(...args: any[]) {}

  collides(us: Entity, them: Entity) {}

  update(...args: any[]) {}
}

export class Entity {
  pos = new Vec2(0, 0);
  vel = new Vec2(0, 0);
  size = new Vec2(0, 0);
  offset = new Vec2(0, 0);
  bounds: BoundingBox;
  lifetime: number = 0;
  traits: Trait[] = [];
  [key: string]: any; // zum Hinzufügen von Traits

  constructor() {
    this.bounds = new BoundingBox(this.pos, this.size, this.offset);
  }

  addTrait(trait: Trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }

  collides(candidate: Entity) {
    this.traits.forEach((trait) => {
      trait.collides(this, candidate);
    });
  }

  obstruct(side: Sides, match: TileBounds) {
    this.traits.forEach((trait) => {
      trait.obstruct(this, side, match);
    });
  }

  draw(ctx: CanvasRenderingContext2D) {}

  finalize() {
    this.traits.forEach((trait) => {
      trait.finalize();
    });
  }

  update(deltaTime: number, level: Level) {
    this.traits.forEach((trait) => {
      trait.update(this, deltaTime, level);
    });
    this.lifetime += deltaTime;
  }
}
