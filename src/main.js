//Platformer Mario

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

loadLevel("1-1")
.then((levelSpec) => Promise.all([
  levelSpec,
  loadSpriteSheet(levelSpec.spritesheet),
  createMario()
]))
.then(([levelSpec,tiles,mario]) => {
  const gravity = 30;

  mario.pos.set(64,180);
  mario.vel.set(200,-600);

  const comp = new Compositor();
  const backgroundLayer = createBackgroundLayer(levelSpec.backgrounds,tiles);
  comp.layers.push(backgroundLayer);

  const timer = new Timer(1/60);

  timer.update = function update(deltaTime) {
    comp.draw(context);
    mario.draw(context);

    mario.update(deltaTime);
    mario.vel.y += gravity;
  }

  timer.start(0);
});