//Platformer Mario

function createPlayerEnvironment(playerEntity) {
  const playerEnv = new Entity();
  const playerControl = new PlayerController();
  playerControl.checkpoint.set(64, 64);
  playerControl.setPlayer(playerEntity);
  playerEnv.addTrait(playerControl);
  return playerEnv;
}

async function main(canvas){
  const context = canvas.getContext('2d');

  const [entityFactory, font] = await Promise.all([
    loadEntities(),
    loadFont()
  ]);
  const loadLevel = await createLevelLoader(entityFactory);
  const level = await loadLevel('1-1');

  const camera = new Camera();
  window.camera = camera;

  const mario = entityFactory.mario();

  // level.comp.layers.push(
  //   createCollisionLayer(level),
  //   createCameraLayer(camera)
  // );

  const playerEnv = createPlayerEnvironment(mario);
  level.entities.add(playerEnv);

  const input = setupKeyboard(mario);
  input.listenTo(window);

  //setupMouseControl(canvas,mario,camera);

  const timer = new Timer(1/60);

  timer.update = function update(deltaTime) {
    level.update(deltaTime);

    camera.pos.x = Math.max(0, mario.pos.x - 100);
    
    level.comp.draw(context, camera);

    font.draw('A', context, 0, 0);
  }

  timer.start(0);
}

const canvas = document.getElementById('screen');
main(canvas);