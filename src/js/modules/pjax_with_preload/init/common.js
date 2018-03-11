const Hover = require('js-util/Hover');

module.exports = {
  initBeforeTransit: function(contents, modules, isPageLoaded) {
    // hover演出のためのclassをjsで付与
    const elmHover = contents.querySelectorAll('.js-hover');
    for (var i = 0; i < elmHover.length; i++) {
      new Hover(elmHover[i]);
    }

    // ページロード直後とページ遷移後の初期化を区別
    if (!isPageLoaded) {
      // ページロード直後の初期化
    } else {
      // ページ遷移後の初期化
    }
  },
  initAfterTransit: function(contents, modules) {

  },
};
