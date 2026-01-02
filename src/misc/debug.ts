import { Camera } from "../classes/Camera";
import { Entity } from "../classes/Entity";

function setupMouseControl(canvas: HTMLCanvasElement, entity: Entity, camera: Camera){
  let lastEvent: MouseEvent;

  ['mousedown','mousemove'].forEach(eventName => {
    canvas.addEventListener(eventName, event => {
      const mouseEvent: MouseEvent = event as MouseEvent;
      if(mouseEvent.buttons === 1) {
        entity.vel.set(0,0);
        entity.pos.set(
          mouseEvent.offsetX + camera.pos.x,
          mouseEvent.offsetY + camera.pos.y
        );
      } else if (mouseEvent.buttons === 2
          && lastEvent && lastEvent.buttons === 2
          && lastEvent.type === 'mousemove') {
        camera.pos.x = mouseEvent.offsetX - lastEvent.offsetX;
      }
      lastEvent = mouseEvent;
    });
  });

  canvas.addEventListener('contextmenu', event => {
    event.preventDefault();
  });
}
