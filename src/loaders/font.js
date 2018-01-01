const CHARS = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

function loadFont() {
  return loadImage('img/font.png')
  .then(image => {
    const fontSprite = new SpriteSheet(image);

    const size = 8;
    const rowLen = image.width;

    for (let [index,char] of [...CHARS].entries()) {
      const x = index * size % rowLen;
      const y = Math.floor(index * size / rowLen) * size;
      console.log(index, char, x, y);
      fontSprite.define(char, x, y, size, size);
    }

    return fontSprite;
  });
}