var Sides = {
  TOP: Symbol('top'),
  BOTTOM: Symbol('bottom'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('right')
};

class Trait {
  constructor(name){
    this.NAME = name;
  }

  obstruct(){

  }

  collides(us, them) {
    
  }

  update(){
    
  }
}

class Entity{
  constructor(){
    this.pos = new Vec2(0,0);
    this.vel = new Vec2(0,0);
    this.size = new Vec2(0,0);
    this.offset = new Vec2(0, 0);

    this.bounds = new BoundingBox(this.pos, this.size, this.offset);
    
    this.lifetime = 0;

    this.traits = [];
  }

  addTrait(trait){
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }

  collides(candidate) {
    this.traits.forEach(trait => {
      trait.collides(this, candidate);
    });
  }

  obstruct(side){
    this.traits.forEach(trait => {
      trait.obstruct(this, side);
    });
  }

  update(deltaTime, level){
    this.traits.forEach(trait => {
        trait.update(this, deltaTime, level);
    });
    this.lifetime += deltaTime;
  }
}