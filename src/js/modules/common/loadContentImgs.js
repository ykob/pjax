import loadImage from './loadImage';

export default function(contents, callback) {
  const imgs = contents.querySelectorAll('img');

  if (imgs.length > 0) {
    const imgArray = [];
    for (var i = 0; i < imgs.length; i++) {
      imgArray[i] = imgs[i].src;
    }
    loadImage(imgArray, callback);
  } else {
    callback();
  }
}
