import Hover from 'js-util/Hover';

// initBeforeTransit method: before scrollManager.resize run.
const initBeforeTransit = (contentsArr, modules, isPageLoaded) => {
  contentsArr.map((contents) => {
    // Bind the class to run the hover effect.
    [...contents.querySelectorAll('.js-hover')].map(elm => {
      new Hover(elm);
    });
  });

  // ページロード直後とページ遷移後の初期化を区別
  if (!isPageLoaded) {
    // ページロード直後の初期化
  } else {
    // ページ遷移後の初期化
  }
};

// initAfterTransit method: after scrollManager.resize run.
const initAfterTransit = (contentsArr, modules) => {
};

export default {
  initBeforeTransit,
  initAfterTransit,
}
