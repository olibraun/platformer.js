function loadEntities() {
  return Promise.all([
    loadMario(),
    loadGoomba(),
    loadKoopa()
  ]);
}