import { Camera } from "../classes/Camera.js";
import { Entity } from "../classes/Entity.js";

export function createSpriteLayer(
  entities: Set<Entity>,
  width = 64,
  height = 64
) {
  const spriteBuffer: HTMLCanvasElement = document.createElement("canvas");
  spriteBuffer.width = width;
  spriteBuffer.height = height;
  const spriteBufferContext: CanvasRenderingContext2D =
    spriteBuffer.getContext("2d")!;

  return function spriteLayer(
    context: CanvasRenderingContext2D,
    camera: Camera
  ) {
    entities.forEach((entity) => {
      spriteBufferContext.clearRect(0, 0, width, height);

      entity.draw(spriteBufferContext);

      context.drawImage(
        spriteBuffer,
        entity.pos.x - camera.pos.x,
        entity.pos.y - camera.pos.y
      );
    });
  };
}
