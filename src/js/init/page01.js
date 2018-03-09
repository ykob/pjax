const loadImgs = require('../modules/common/loadImgs').default;

module.exports = {
  // preload method: after content is replaced. / before scrollManager.resize run.
  preload: function(contents, scrollManager, callback) {
    callback();
  },
  // initBeforeTransit method: after scrollManager.resize run. / before page transition.
  initBeforeTransit: function(contents, scrollManager) {
  },
  // initAfterTransit method: after page transition.
  initAfterTransit: function(contents, scrollManager) {
    const title = contents.querySelector('.p-lower-header__title');
    const excerpt = contents.querySelector('.p-lower-header__excerpt');

    title.classList.add('is-shown');
    excerpt.classList.add('is-shown');
  },
  // clear any variables.
  clear: function() {
  },
}
