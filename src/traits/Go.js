class Go extends Trait {
  constructor(){
    super('go');

    this.dir = 0;
    this.speed = 6000;

    this.distance = 0;
  }

  update(entity,deltaTime){
    entity.vel.x = this.speed * this.dir * deltaTime;

    this.distance += Math.abs(entity.vel.x) * deltaTime;
  }
}