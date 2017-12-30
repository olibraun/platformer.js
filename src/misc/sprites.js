function loadMarioSpriteSheet(){
  return loadImage("img/characters.gif")
  .then(image => {
    const MarioSprite = new SpriteSheet(image,16,16);
    MarioSprite.define("idle",276,44,16,16);
    return MarioSprite;
  });
}