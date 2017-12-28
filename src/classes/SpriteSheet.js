class SpriteSheet{
  constructor(image,width,height){
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
  }

  define(name,row_index,col_index){
    const buffer = document.createElement('canvas');
    console.log(buffer);
    buffer.height = this.height;
    buffer.width = this.width;
    buffer
      .getContext('2d')
      .drawImage(
        this.image,
        row_index*this.width,
        col_index*this.height,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height
      );
    this.tiles.set(name,buffer);
  }

  draw(name, context, x, y) {
    const buffer = this.tiles.get(name);
    console.log(buffer);
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