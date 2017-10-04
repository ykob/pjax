import loadImage from '../modules/loadImage';

module.exports = {
  preload: function(callback) {
    loadImage([
      '/pjax/img/page01/bg.jpg'
    ], callback);
  },
  // initBeforeTransit method: after scrollManager.resize run. / before page transition.
  initBeforeTransit: function(contents, fixedBefore, fixedAfter, scrollManager) {
  },
  // initAfterTransit method: after page transition.
  initAfterTransit: function(contents, fixedBefore, fixedAfter, scrollManager) {
    const title = contents.querySelector('.p-lower-header__title');
    const excerpt = contents.querySelector('.p-lower-header__excerpt');
    const elmBg = fixedAfter.querySelector('.js-background');

    title.classList.add('is-shown');
    excerpt.classList.add('is-shown');
    elmBg.classList.add('is-scale')
  },
}
