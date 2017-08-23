import Hover from 'js-util/Hover.js';

module.exports = function(contents, scrollManager, isPageLoaded) {
  // ページロード直後とページ遷移後とで親となるラッパーを変更
  const doc = (!isPageLoaded) ? document : contents;

  // hover演出のためのclassをjsで付与
  const elmHover = doc.querySelectorAll('.js-hover');
  for (var i = 0; i < elmHover.length; i++) {
    new Hover(elmHover[i]);
  }

  // 背景画像の演出
  const elmBg = document.querySelector('.js-background');
  console.log(elmBg)
  elmBg.classList.add('is-scale')

  // ページロード直後とページ遷移後の初期化を区別
  if (!isPageLoaded) {
    // ページロード直後の初期化
  } else {
    // ページ遷移後の初期化
  }
};
