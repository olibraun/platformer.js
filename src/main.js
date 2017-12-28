//Platformer Mario

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

loadLevel("1-1")
.then((levelSpec) => Promise.all([
  levelSpec,
  loadSpriteSheet(levelSpec.spritesheet)
]))
.then(([levelSpec,tiles]) => {
  window.levelSpec = levelSpec;
  levelSpec.backgrounds.forEach(background => {
    background.ranges.forEach(([x,xr,y,yr]) => {
      tiles.drawByIndexRange(background.name,context, x,xr,y,yr);
    });
  });

  const pos = {
    x: 64,
    y: 64
  }

  //draw mario at pos

  function update() {
    pos.x += 2;
    pos.y += 2;
    requestAnimationFrame(update);
  }

  update();
});