function createBackgroundLayer(backgrounds,tiles){
  const buffer = document.createElement('canvas');
  buffer.width = canvas.width;
  buffer.height = canvas.height;

  backgrounds.forEach(background => {
    background.ranges.forEach(([x,xr,y,yr]) => {
      tiles.drawByIndexRange(background.name,buffer.getContext('2d'), x,xr,y,yr);
    });
  });

  return function drawBackgroundLayer(context){
    context.drawImage(buffer,0,0);
  };
}

function createSpriteLayer(entity){
  return function spriteLayer(context){
    entity.draw(context);
  }
}