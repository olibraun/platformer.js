class Killable extends Trait {
  constructor() {
    super('killable');
    this.dead = false;
  }

  kill() {
    this.dead = true;
  }
}