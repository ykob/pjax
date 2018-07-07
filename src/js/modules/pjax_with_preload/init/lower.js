require("babel-polyfill");

const loadContentImgs = require('../../common/loadContentImgs').default;

module.exports = {
  // initBeforeTransit method: before scrollManager.resize run.
  initBeforeTransit: async function(contents, modules) {
  },
  // initAfterTransit method: after scrollManager.resize run.
  initAfterTransit: function(contents, modules) {
    const title = contents.querySelector('.p-lower-header__title');
    const excerpt = contents.querySelector('.p-lower-header__excerpt');

    title.classList.add('is-shown');
    excerpt.classList.add('is-shown');
  },
  // clear any variables.
  clear: function(modules) {
  },
}
