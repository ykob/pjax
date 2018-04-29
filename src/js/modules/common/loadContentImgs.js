const loadImgs = require('./loadImgs').default;

export default function(contents, callback, addImgs = []) {
  const imgs = contents.querySelectorAll('img');

  if (imgs.length > 0) {
    const imgArray = [];
    for (var i = 0; i < imgs.length; i++) {
      imgArray[i] = imgs[i].src;
    }
    for (var j = 0; j < addImgs.length; j++) {
      imgArray.push(addImgs[j]);
    }
    loadImgs(imgArray, callback);
  } else {
    callback();
  }
}
