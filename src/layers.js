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
    resolvedTiles.forEach(({x,y}) => {
      console.log('Would draw',x,y);
    });

    resolvedTiles.length=0;
  }
}