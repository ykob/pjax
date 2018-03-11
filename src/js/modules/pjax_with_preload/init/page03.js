module.exports = {
  // preload method: after content is replaced. / before scrollManager.resize run.
  preload: function(contents, modules, callback) {
    callback();
  },
  // initBeforeTransit method: after scrollManager.resize run. / before page transition.
  initBeforeTransit: function(contents, modules) {
  },
  // initAfterTransit method: after page transition.
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
