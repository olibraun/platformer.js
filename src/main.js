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
  const gravity = 0.5;
  const comp = new Compositor();
  const backgroundLayer = createBackgroundLayer(levelSpec.backgrounds,tiles);
  comp.layers.push(backgroundLayer);

  function update() {
    //draw background from buffer
    comp.draw(context);
    mario.draw(context);

    mario.update();
    mario.vel.y += gravity;
    requestAnimationFrame(update);
  }

  update();
});