import { Entity, Trait } from "../classes/Entity.js";
import { SpriteSheet } from "../classes/SpriteSheet.js";
import { loadSpriteSheet } from "../misc/loaders.js";
import { Killable } from "../traits/Killable.js";
import { PendulumMove } from "../traits/PendulumMove.js";
import { Physics } from "../traits/Physics.js";
import { Solid } from "../traits/Solid.js";

export function loadKoopa() {
  return loadSpriteSheet("koopa").then(createKoopaFactory);
}

enum KoopaState {
  STATE_WALKING = "walking",
  STATE_HIDING = "hiding",
  STATE_PANIC = "panic",
}

class KoopaBehavior extends Trait {
  hideTime: number = 0;
  hideDuration: number = 5;

  walkSpeed: number | null = null;
  panicSpeed: number = 300;

  state: KoopaState = KoopaState.STATE_WALKING;

  constructor() {
    super("behavior");
  }

  collides(us: Entity, them: Entity) {
    if (us.killable.dead) {
      return;
    }

    if (them.stomper) {
      if (them.vel.y > us.vel.y) {
        this.handleStomp(us, them);
      } else {
        this.handleNudge(us, them);
      }
    }
  }

  handleNudge(us: Entity, them: Entity) {
    if (this.state === KoopaState.STATE_WALKING) {
      them.killable.kill();
    } else if (this.state === KoopaState.STATE_HIDING) {
      this.panic(us, them);
    } else if (this.state === KoopaState.STATE_PANIC) {
      const travelDir = Math.sign(us.vel.x);
      const impactDir = Math.sign(us.pos.x - them.pos.x);
      if (travelDir !== 0 && travelDir !== impactDir) {
        them.killable.kill();
      }
    }
  }

  handleStomp(us: Entity, them: Entity) {
    if (this.state === KoopaState.STATE_WALKING) {
      this.hide(us);
    } else if (this.state === KoopaState.STATE_HIDING) {
      us.killable.kill();
      us.vel.set(100, -200);
      us.solid.obstructs = false;
    } else if (this.state === KoopaState.STATE_PANIC) {
      this.hide(us);
    }
  }

  hide(us: Entity) {
    us.vel.x = 0;
    us.pendulumMove.enabled = false;
    if (this.walkSpeed === null) {
      this.walkSpeed = us.pendulumMove.speed;
    }
    this.hideTime = 0;
    this.state = KoopaState.STATE_HIDING;
  }

  unhide(us: Entity) {
    us.pendulumMove.enabled = true;
    us.pendulumMove.speed = this.walkSpeed;
    this.state = KoopaState.STATE_WALKING;
  }

  panic(us: Entity, them: Entity) {
    us.pendulumMove.enabled = true;
    us.pendulumMove.speed = this.panicSpeed * Math.sign(them.vel.x);
    this.state = KoopaState.STATE_PANIC;
  }

  update(us: Entity, deltaTime: number) {
    if (this.state === KoopaState.STATE_HIDING) {
      this.hideTime += deltaTime;
      if (this.hideTime > this.hideDuration) {
        this.unhide(us);
      }
    }
  }
}

function createKoopaFactory(sprite: SpriteSheet) {
  const walkAnim = sprite.animations.get("walk")!;
  const wakeAnim = sprite.animations.get("wake")!;

  function routeAnim(koopa: Entity) {
    if (koopa.behavior.state === KoopaState.STATE_HIDING) {
      if (koopa.behavior.hideTime > 3) {
        return wakeAnim(koopa.behavior.hideTime);
      }
      return "hiding";
    }

    if (koopa.behavior.state === KoopaState.STATE_PANIC) {
      return "hiding";
    }

    return walkAnim(koopa.lifetime);
  }

  function drawKoopa(this: Entity, context: CanvasRenderingContext2D) {
    sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
  }

  return function createKoopa() {
    const koopa = new Entity();
    koopa.size.set(16, 16);
    koopa.offset.y = 8;

    koopa.draw = drawKoopa;

    koopa.addTrait(new Solid());
    koopa.addTrait(new Physics());
    koopa.addTrait(new PendulumMove());
    koopa.addTrait(new Killable());
    koopa.addTrait(new KoopaBehavior());

    return koopa;
  };
}
