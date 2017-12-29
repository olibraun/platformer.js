function createBackgroundLayer(level,tiles){
  const buffer = document.createElement('canvas');
  buffer.width = canvas.width;
  buffer.height = canvas.height;

  const context = buffer.getContext('2d');

  level.tiles.forEach((tile,x,y) => {
    tiles.drawByIndex(tile.name, context, x, y);
  });

  return function drawBackgroundLayer(context){
    context.drawImage(buffer,0,0);
  };
}

function createSpriteLayer(entities){
  return function spriteLayer(context){
    entities.forEach(entity => {
      entity.draw(context);
    });
  }
}