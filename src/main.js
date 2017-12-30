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

  ['mousedown','mousemove'].forEach(eventName => {
    canvas.addEventListener(eventName, event => {
      if(event.buttons === 1) {
        mario.vel.set(0,0);
        mario.pos.set(event.offsetX,event.offsetY);
      }
    });
  });

  const timer = new Timer(1/60);

  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    level.comp.draw(context, camera);
  }

  timer.start(0);
});