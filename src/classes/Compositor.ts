import { Camera } from "./Camera.js";

class Compositor{
  layers: ((arg1: CanvasRenderingContext2D, arg2: Camera) => {})[];

  constructor(){
    this.layers = [];
  }

  draw(context: CanvasRenderingContext2D, camera: Camera){
    this.layers.forEach(layer => {
      layer(context, camera);
    });
  }
}