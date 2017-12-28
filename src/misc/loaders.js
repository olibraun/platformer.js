function getImage(url){
  //loadImage with promise
  return new Promise(resolve => {
      const img = loadImage(url, () => {
        resolve(img);
      });
  });
}

function getJSON(url){
  //loadJSON with promise
  return new Promise(resolve => {
    const json = loadJSON(url, () => {
      resolve(json);
    });
  });
}