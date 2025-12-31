import { Entity } from "./classes/Entity.js";
import { loadGoomba } from "./entities/Goomba.js";
import { loadKoopa } from "./entities/Koopa.js";
import { loadMario } from "./entities/Mario.js";

export type EntityFactories = {
  [key: string]: Function; // zum Hinzufügen von Factories
};

export function loadEntities() {
  const entityFactories: EntityFactories = {};

  function addAs(name: string) {
    return (factory: Function) => (entityFactories[name] = factory);
  }

  return Promise.all([
    loadMario().then(addAs("mario")),
    loadGoomba().then(addAs("goomba")),
    loadKoopa().then(addAs("koopa")),
  ]).then(() => entityFactories);
}
