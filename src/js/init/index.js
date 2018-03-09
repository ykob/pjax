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
  },
  // clear any variables.
  clear: function() {
  },
}
