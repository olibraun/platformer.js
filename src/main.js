//Platformer Mario

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

loadLevel("1-1")
.then((level) => Promise.all([
  level,
  createMario()
]))
.then(([level,mario]) => {
  const camera = new Camera();
  window.camera = camera;

  mario.pos.set(64,64);

  level.comp.layers.push(createCollisionLayer(level));

  level.entities.add(mario);

  const input = setupKeyboard(mario);
  input.listenTo(window);

  setupMouseControl(canvas,mario,camera);

  const timer = new Timer(1/60);

  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    level.comp.draw(context, camera);
  }

  timer.start(0);
});