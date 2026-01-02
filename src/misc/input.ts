import { Entity } from "../classes/Entity.js";
import { KeyboardState } from "../classes/KeyboardState.js";

export function setupKeyboard(mario: Entity) {
  const input = new KeyboardState();
  input.addMapping("KeyP", (keyState: 0 | 1) => {
    if (keyState) {
      mario.jump.start();
    } else {
      mario.jump.cancel();
    }
  });

  input.addMapping("KeyO", (keyState: 0 | 1) => {
    mario.turbo(keyState);
  });

  input.addMapping("KeyD", (keyState: 0 | 1) => {
    mario.go.dir += keyState ? 1 : -1;
  });

  input.addMapping("KeyA", (keyState: 0 | 1) => {
    mario.go.dir += keyState ? -1 : 1;
  });

  return input;
}
