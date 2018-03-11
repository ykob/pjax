const loadContentImgs = require('../../common/loadContentImgs').default;

module.exports = {
  // preload method: after content is replaced. / before scrollManager.resize run.
  preload: function(contents, modules, callback) {
    loadContentImgs(contents, callback);
  },
  // initBeforeTransit method: after scrollManager.resize run. / before page transition.
  initBeforeTransit: function(contents, modules) {
  },
  // initAfterTransit method: after page transition.
  initAfterTransit: function(contents, modules) {
  },
  // clear any variables.
  clear: function() {
  },
}
