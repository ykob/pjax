require("babel-polyfill");

const loadImgs = require('../../common/loadImgs').default;

module.exports = {
  // initBeforeTransit method: before scrollManager.resize run.
  initBeforeTransit: async function(contents, modules) {
    await loadImgs([
      '/pjax/img/index/bg.jpg',
      '/pjax/img/page01/bg.jpg',
      '/pjax/img/page02/bg.jpg',
      '/pjax/img/page03/bg.jpg',
    ]);
  },
  // initAfterTransit method: after scrollManager.resize run.
  initAfterTransit: function(contents, modules) {
  },
  // clear any variables.
  clear: function(modules) {
  },
}
