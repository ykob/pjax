const loadContentImgs = require('../modules/common/loadContentImgs').default;

module.exports = {
  // preload method: after content is replaced. / before scrollManager.resize run.
  preload: function(contents, scrollManager, callback) {
    loadContentImgs(contents, callback);
  },
  // initBeforeTransit method: after scrollManager.resize run. / before page transition.
  initBeforeTransit: function(contents, scrollManager) {
  },
  // initAfterTransit method: after page transition.
  initAfterTransit: function(contents, scrollManager) {
  },
  // clear any variables.
  clear: function() {
  },
}
