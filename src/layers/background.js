function createBackgroundLayer(level, tiles, sprties){
  const resolver = new TileResolver(tiles);

  const buffer = document.createElement('canvas');
  buffer.width = 256+16;
  buffer.height = 240;

  const context = buffer.getContext('2d');

  function redraw(startIndex, endIndex){
    context.clearRect(0, 0, buffer.width, buffer.height);
    for(let x = startIndex; x <= endIndex; ++x){
      const col = tiles.grid[x];
      if(col){
        col.forEach((tile,y) => {
          if(sprties.animations.has(tile.name)){
            sprties.drawAnim(tile.name, context, x - startIndex, y, level.totalTime);
          } else {
            sprties.drawByIndex(tile.name, context, x - startIndex, y);
          }
        })
      }
    }
  }

  return function drawBackgroundLayer(context, camera){
    const drawWidth = resolver.toIndex(camera.size.x);
    const drawFrom = resolver.toIndex(camera.pos.x);
    const drawTo = drawFrom + drawWidth;

    redraw(drawFrom, drawTo);

    context.drawImage(buffer,
      -camera.pos.x % 16,
      -camera.pos.y
    );
  };
}