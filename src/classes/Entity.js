class Trait {
  constructor(name){
    this.NAME = name;
  }

  update(){
    console.warn('unhandled update call in trait');
  }
}

class Entity{
  constructor(){
    this.pos = new Vec2(0,0);
    this.vel = new Vec2(0,0);
    this.size = new Vec2(0,0);

    this.traits = [];
  }

  addTrait(trait){
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }

  update(deltaTime){
    this.traits.forEach(trait => {
        trait.update(this,deltaTime);
    });
  }
}