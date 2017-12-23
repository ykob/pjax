export default function(imgArray, callback) {
  const length = imgArray.length;
  let count = 0;

  for (var i = 0; i < length; i++) {
    const img = new Image();
    img.onload = () => {
      count++;
      if (count >= length) callback();
    };
    img.onerror = () => {
      console.error(`Failed to load image in loadImage function.`)
      count++;
      if (count >= length) callback();
    };
    img.src = imgArray[i];
  }
}
