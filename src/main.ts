//Platformer Mario

import { Camera } from "./classes/Camera.js";
import { Entity } from "./classes/Entity.js";
import { Timer } from "./classes/Timer.js";
import { loadEntities } from "./entities.js";
import { createDashboardLayer } from "./layers/dashboard.js";
import { loadFont } from "./loaders/font.js";
import { setupKeyboard } from "./misc/input.js";
import { PlayerController } from "./traits/PlayerController.js";

function createPlayerEnvironment(playerEntity: Entity) {
  const playerEnv = new Entity();
  const playerControl = new PlayerController();
  playerControl.checkpoint.set(64, 64);
  playerControl.setPlayer(playerEntity);
  playerEnv.addTrait(playerControl);
  return playerEnv;
}

async function main(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");

  const [entityFactory, font] = await Promise.all([loadEntities(), loadFont()]);
  const loadLevel = await createLevelLoader(entityFactory);
  // const level = await loadLevel('workbench');
  const level = await loadLevel("1-1");

  const camera = new Camera();
  window.camera = camera;

  const mario = entityFactory.mario();

  const playerEnv = createPlayerEnvironment(mario);
  level.entities.add(playerEnv);

  const input = setupKeyboard(mario);
  input.listenTo(window);

  //setupMouseControl(canvas,mario,camera);

  // level.comp.layers.push(
  //   createCollisionLayer(level),
  //   createCameraLayer(camera)
  // );

  level.comp.layers.push(createDashboardLayer(font, playerEnv));

  const timer = new Timer(1 / 60);

  timer.update = function update(deltaTime) {
    level.update(deltaTime);

    camera.pos.x = Math.max(0, mario.pos.x - 100);

    level.comp.draw(context, camera);
  };

  //timer.start(0);
  timer.start();
}

const canvas = document.getElementById("screen") as HTMLCanvasElement;
main(canvas);
