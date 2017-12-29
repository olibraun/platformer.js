class Level{
  constructor(){
    this.comp = new Compositor();
    this.entities = new Set();
  }

  update(deltaTime){
    this.entities.forEach(entity => {
      entity.update(deltaTime);
    });
  }
}