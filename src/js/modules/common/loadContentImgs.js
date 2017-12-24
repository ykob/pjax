const loadImgs = require('./loadImgs').default;

export default function(contents, callback) {
  const imgs = contents.querySelectorAll('img');

  if (imgs.length > 0) {
    const imgArray = [];
    for (var i = 0; i < imgs.length; i++) {
      imgArray[i] = imgs[i].src;
    }
    loadImgs(imgArray, callback);
  } else {
    callback();
  }
}
