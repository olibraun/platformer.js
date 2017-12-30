class SpriteSheet{
  constructor(image,width,height){
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
    this.animations = new Map();
  }

  defineAnim(name, animation){
    this.animations.set(name, animation);
  }

  define(name,x,y,width,height){
    const buffers = [false,true].map(flip => {
      const buffer = document.createElement('canvas');
      buffer.width = width;
      buffer.height = height;

      const context = buffer.getContext('2d');

      if(flip){
        context.scale(-1, 1);
        context.translate(-width, 0);
      }

      context.drawImage(
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

      return buffer;
    });

    this.tiles.set(name,buffers);
  }

  defineTile(name,row_index,col_index){
    this.define(name,this.width*row_index,this.height*col_index,this.width,this.height);
  }

  draw(name, context, x, y, flip = false) {
    const buffer = this.tiles.get(name)[flip ? 1 : 0];
    context.drawImage(buffer, x, y);
  }

  drawAnim(name, context, x, y, distance){
    const animation = this.animations.get(name);
    this.drawByIndex(animation(distance), context, x, y);
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