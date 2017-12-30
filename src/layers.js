function createBackgroundLayer(level,tiles){
  const buffer = document.createElement('canvas');
  buffer.width = 2048;//canvas.width;
  buffer.height = canvas.height;

  const context = buffer.getContext('2d');

  level.tiles.forEach((tile,x,y) => {
    tiles.drawByIndex(tile.name, context, x, y);
  });

  return function drawBackgroundLayer(context, camera){
    context.drawImage(buffer, -camera.pos.x, -camera.pos.y);
  };
}

function createSpriteLayer(entities){
  return function spriteLayer(context){
    entities.forEach(entity => {
      entity.draw(context);
    });
  }
}

function createCollisionLayer(level){
  const resolvedTiles = [];

  const tileResolver = level.tileCollider.tiles;
  const tileSize = tileResolver.tileSize;

  //"Spy" for getByIndex mathod
  const getByIndexOriginal = tileResolver.getByIndex;
  tileResolver.getByIndex = function getByIndexFake(x,y){
    resolvedTiles.push({x,y});
    return getByIndexOriginal.call(tileResolver, x, y);
  };

  return function drawCollision(context){
    context.strokeStyle = 'blue';
    resolvedTiles.forEach(({x,y}) => {
      context.beginPath();
      context.rect(
        x*tileSize, y*tileSize,
        tileSize, tileSize);
      context.stroke();
    });

  context.strokeStyle = 'red';
    level.entities.forEach(entity => {
      context.beginPath();
      context.rect(
        entity.pos.x, entity.pos.y,
        entity.size.x, entity.size.y);
      context.stroke();
    })

    resolvedTiles.length=0;
  }
}