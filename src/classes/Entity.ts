import { Vec2 } from "../misc/math.js";
import { BoundingBox } from "./BoundingBox.js";

var Sides = {
  TOP: Symbol("top"),
  BOTTOM: Symbol("bottom"),
  LEFT: Symbol("left"),
  RIGHT: Symbol("right"),
};

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

  obstruct() {}

  collides(us: Entity, them: Entity) {}

  update() {}
}

export class Entity {
  pos = new Vec2(0, 0);
  vel = new Vec2(0, 0);
  size = new Vec2(0, 0);
  offset = new Vec2(0, 0);
  bounds: BoundingBox;
  lifetime: number = 0;
  traits: Trait[] = [];
  [key: string]: any;  // zum Hinzufügen von Traits

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

  obstruct(side, match) {
    this.traits.forEach((trait) => {
      trait.obstruct(this, side, match);
    });
  }

  draw() {}

  finalize() {
    this.traits.forEach((trait) => {
      trait.finalize();
    });
  }

  update(deltaTime, level) {
    this.traits.forEach((trait) => {
      trait.update(this, deltaTime, level);
    });
    this.lifetime += deltaTime;
  }
}
