import loadImage from '../modules/loadImage';

module.exports = {
  // preload method: after content is replaced. / before scrollManager.resize run.
  preload: function(callback) {
    loadImage([
      '/pjax/img/index/bg.jpg'
    ], callback);
  },
  // initBeforeTransit method: after scrollManager.resize run. / before page transition.
  initBeforeTransit: function(contents, fixedBefore, fixedAfter, scrollManager) {
  },
  // initAfterTransit method: after page transition.
  initAfterTransit: function(contents, fixedBefore, fixedAfter, scrollManager) {
    const elmBg = fixedAfter.querySelector('.js-background');

    elmBg.classList.add('is-scale')
  },
}
