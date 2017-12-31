//Platformer Mario

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

loadEntities()
.then(entityFactory => Promise.all([
  createLevelLoader(entityFactory),
  entityFactory
]))
.then(([loadLevel, entityFactory]) => Promise.all([
  loadLevel('1-1'),
  entityFactory
]))
.then(([level, entityFactory]) => {
  const camera = new Camera();
  window.camera = camera;

  const mario = entityFactory.mario();
  mario.pos.set(64,64);

  const goomba = entityFactory.goomba();
  goomba.pos.x = 208;
  level.entities.add(goomba);

  const koopa = entityFactory.koopa();
  koopa.pos.x = 192;
  level.entities.add(koopa);

  level.comp.layers.push(
    createCollisionLayer(level),
    createCameraLayer(camera)
  );

  level.entities.add(mario);

  const input = setupKeyboard(mario);
  input.listenTo(window);

  //setupMouseControl(canvas,mario,camera);

  const timer = new Timer(1/60);

  timer.update = function update(deltaTime) {
    level.update(deltaTime);

    if(mario.pos.x > 100){
      camera.pos.x = mario.pos.x - 100;
    }
    
    level.comp.draw(context, camera);
  }

  timer.start(0);
});