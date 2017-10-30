module.exports = {
  // preload method: after content is replaced. / before scrollManager.resize run.
  preload: function(callback) {
    callback();
  },
  // initBeforeTransit method: after scrollManager.resize run. / before page transition.
  initBeforeTransit: function(contents, fixedBefore, fixedAfter, scrollManager) {
  },
  // initAfterTransit method: after page transition.
  initAfterTransit: function(contents, fixedBefore, fixedAfter, scrollManager) {
  },
  // clear any variables.
  clear: function() {
  },
}
