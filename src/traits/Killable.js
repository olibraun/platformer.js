class Killable extends Trait {
  constructor() {
    super('killable');
    this.dead = false;
    this.deadTime = 0;
    this.removeAfter = 2;
  }

  kill() {
    this.dead = true;
  }

  update(entity, deltaTime, level) {
    if(this.dead) {
      this.deadTime += deltaTime;
      if(this.deadTime > this.removeAfter) {
        level.entities.delete(entity);
      }
    }
  }
}