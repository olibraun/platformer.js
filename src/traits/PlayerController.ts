import { Entity, Trait } from "../classes/Entity.js";
import { Level } from "../classes/Level.js";
import { Vec2 } from "../misc/math.js";

export class PlayerController extends Trait {
  checkpoint: Vec2 = new Vec2(0, 0);
  score: number = 0;
  time: number = 300;
  canvasHeight: number = (
    document.getElementById("screen")! as HTMLCanvasElement
  ).height;
  player: Entity | undefined;

  constructor() {
    super("playerController");
    this.player = undefined;
  }

  setPlayer(entity: Entity) {
    this.player = entity;

    this.player.stomper.onStomp = () => {
      this.score += 100;
    };
  }

  update(entity: Entity, deltaTime: number, level: Level) {
    if (!level.entities.has(this.player!)) {
      this.player!.killable.revive();
      this.player!.pos.set(this.checkpoint.x, this.checkpoint.y);
      level.entities.add(this.player!);
    } else {
      this.time -= deltaTime * 2;

      if (this.player!.pos.y > this.canvasHeight + this.player!.size.y) {
        this.player!.killable.kill();
      }
    }
  }
}
