require("babel-polyfill");

const loadContentImgs = require('../../common/loadContentImgs').default;

module.exports = {
  // initBeforeTransit method: before scrollManager.resize run.
  initBeforeTransit: async function(contents, modules) {
  },
  // initAfterTransit method: after scrollManager.resize run.
  initAfterTransit: function(contents, modules) {
  },
  // clear any variables.
  clear: function(modules) {
  },
}
