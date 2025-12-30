import { createAnim } from "../anim.js";
import { SpriteSheet } from "../classes/SpriteSheet.js";
import { SpriteSheetDTO } from "./DTO.js";

export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}

function loadJSON(url: string): Promise<any> {
  return fetch(url).then((r) => r.json());
}

export function loadSpriteSheet(name: string): Promise<any> {
  return loadJSON(`sprites/${name}.json`)
    .then((spec: SpriteSheetDTO) =>
      Promise.all([spec, loadImage(spec.imageURL)])
    )
    .then(([spec, img]) => {
      const tiles = new SpriteSheet(img, spec.tileW, spec.tileH);
      if (spec.tiles) {
        spec.tiles.forEach((tile) => {
          const index = tile.index;
          tiles.defineTile(tile.name, index[0], index[1]);
        });
      }

      if (spec.frames) {
        spec.frames.forEach((frameSpec) => {
          tiles.define(frameSpec.name, ...frameSpec.rect);
        });
      }

      if (spec.animations) {
        spec.animations.forEach((animSpec) => {
          const animation = createAnim(animSpec.frames, animSpec.frameLen);
          tiles.defineAnim(animSpec.name, animation);
        });
      }

      return tiles;
    });
}
