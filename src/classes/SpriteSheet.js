class SpriteSheet{
  constructor(image,width,height){
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
  }

  define(name,x,y,width,height){
    const buffer = document.createElement('canvas');
    buffer.width = width;
    buffer.height = height;
    buffer
      .getContext('2d')
      .drawImage(
        this.image,
        x,
        y,
        width,
        height,
        0,
        0,
        width,
        height
      );
    this.tiles.set(name,buffer);
  }

  defineTile(name,row_index,col_index){
    this.define(name,this.width*row_index,this.height*col_index,this.width,this.height);
  }

  draw(name, context, x, y) {
    const buffer = this.tiles.get(name);
    context.drawImage(buffer, x, y);
  }

  drawByIndex(name,context,row_index,col_index){
    this.draw(name,context,row_index*this.width,col_index*this.height);
  }

  drawByIndexRange(name,context,row_index,row_len,col_index,col_len){
    for(let i = row_index; i < row_index+row_len; i++){
      for(let j = col_index; j < col_index+col_len; j++){
        this.drawByIndex(name,context,i,j);
      }
    }
  }
}