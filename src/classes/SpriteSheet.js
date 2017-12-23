class SpriteSheet{
  constructor(image,width,height){
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
  }

  define(name,row_index,col_index){
    const buffer = createGraphics(this.width*global_graphics_scale,this.height*global_graphics_scale);
    buffer.pixelDensity(1);
    buffer.image(
      this.image,
      0,
      0,
      this.width*global_graphics_scale,
      this.height*global_graphics_scale,
      row_index*this.width,
      col_index*this.height,
      this.width,
      this.height);
    this.tiles.set(name,buffer);
  }

  drawByIndex(name,row_index,col_index){
    const buffer = this.tiles.get(name);
    image(buffer,row_index*this.width*global_graphics_scale,col_index*this.height*global_graphics_scale);
  }

  drawByIndexRange(name,row_index,row_len,col_index,col_len){
    for(let i = row_index; i < row_index+row_len; i++){
      for(let j = col_index; j < col_index+col_len; j++){
        this.drawByIndex(name,i,j);
      }
    }
  }
}