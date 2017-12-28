//Platformer Mario

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  loadJSON("levels/1-1.json"),
  loadSpriteSheet("overworld")
])
.then(([levelSpec,tiles]) => {
  window.levelSpec = levelSpec;
  levelSpec.backgrounds.forEach(background => {
    background.ranges.forEach(([x,xr,y,yr]) => {
      tiles.drawByIndexRange(background.name,context, x,xr,y,yr);
    });
  });
});