function loadEntities() {
  const entityFactories = {};

  return Promise.all([
    loadMario().then(factory => entityFactories['mario'] = factory),
    loadGoomba().then(factory => entityFactories['goomba'] = factory),
    loadKoopa().then(factory => entityFactories['koopa'] = factory)
  ])
  .then(() => entityFactories);
}