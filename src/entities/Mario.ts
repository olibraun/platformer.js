import { Entity } from "../classes/Entity.js";
import { SpriteSheet } from "../classes/SpriteSheet.js";
import { loadSpriteSheet } from "../misc/loaders.js";
import { Go } from "../traits/Go.js";
import { Jump } from "../traits/Jump.js";
import { Killable } from "../traits/Killable.js";
import { Physics } from "../traits/Physics.js";
import { Solid } from "../traits/Solid.js";
import { Stomper } from "../traits/Stomper.js";

const SLOW_DRAG = 1 / 1000;
const FAST_DRAG = 1 / 5000;

export function loadMario() {
  return loadSpriteSheet("mario").then(createMarioFactory);
}

function createMarioFactory(marioSprites: SpriteSheet) {
  const runAnim = marioSprites.animations.get("run")!;

  function routeFrame(mario: Entity) {
    if (mario.jump.falling) {
      return "jump";
    }
    if (mario.go.distance > 0) {
      if (
        (mario.vel.x > 0 && mario.go.dir < 0) ||
        (mario.vel.x < 0 && mario.go.dir > 0)
      ) {
        return "brake";
      }
      return runAnim(mario.go.distance);
    }
    return "idle";
  }

  function setTurboState(this: Entity, turboOn: boolean) {
    this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
  }

  function drawMario(this: Entity, context: CanvasRenderingContext2D) {
    marioSprites.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
  }

  return function createMario() {
    const mario = new Entity();
    mario.size.set(14, 16);

    mario.addTrait(new Solid());
    mario.addTrait(new Physics());
    mario.addTrait(new Go());
    mario.addTrait(new Jump());
    mario.addTrait(new Stomper());
    mario.addTrait(new Killable());

    mario.killable.removeAfter = 0;

    mario.turbo = setTurboState;
    mario.draw = drawMario;

    mario.turbo(false);

    return mario;
  };
}
