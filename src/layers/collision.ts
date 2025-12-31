import { Camera } from "../classes/Camera.js";
import { Entity } from "../classes/Entity.js";
import { Level } from "../classes/Level.js";
import { TileCollider } from "../classes/TileCollider.js";

function createEntityLayer(entities: Set<Entity>) {
  return function drawBoundingBox(
    context: CanvasRenderingContext2D,
    camera: Camera
  ) {
    context.strokeStyle = "red";
    entities.forEach((entity) => {
      context.beginPath();
      context.rect(
        entity.bounds.left - camera.pos.x,
        entity.bounds.top - camera.pos.y,
        entity.size.x,
        entity.size.y
      );
      context.stroke();
    });
  };
}

function createTileCandidateLayer(tileCollider: TileCollider) {
  const resolvedTiles: { x: number; y: number }[] = [];

  const tileResolver = tileCollider.tiles;
  const tileSize = tileResolver.tileSize;

  //"Spy" for getByIndex mathod
  const getByIndexOriginal = tileResolver.getByIndex;
  tileResolver.getByIndex = function getByIndexFake(x, y) {
    resolvedTiles.push({ x, y });
    return getByIndexOriginal.call(tileResolver, x, y);
  };

  return function drawTileCandidates(
    context: CanvasRenderingContext2D,
    camera: Camera
  ) {
    context.strokeStyle = "blue";
    resolvedTiles.forEach(({ x, y }) => {
      context.beginPath();
      context.rect(
        x * tileSize - camera.pos.x,
        y * tileSize - camera.pos.y,
        tileSize,
        tileSize
      );
      context.stroke();
    });

    resolvedTiles.length = 0;
  };
}

export function createCollisionLayer(level: Level) {
  const drawTileCandidates = createTileCandidateLayer(level.tileCollider!);
  const drawBoundingBoxes = createEntityLayer(level.entities);

  return function drawCollision(
    context: CanvasRenderingContext2D,
    camera: Camera
  ) {
    drawTileCandidates(context, camera);
    drawBoundingBoxes(context, camera);
  };
}
