//Platformer Mario

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  loadSpriteSheet("overworld")
])
.then(([tiles]) => {
  tiles.drawByIndexRange("sky",context,0,16,0,15);
  tiles.drawByIndexRange("ground",context,0,16,13,2);
});