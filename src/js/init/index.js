import loadImage from '../modules/loadImage';

module.exports = {
  preload: function(callback) {
    loadImage([
      '/pjax/img/index/bg.jpg'
    ], callback);
  },
  init: function(contents, scrollManager) {
  },
  initAfterTransit: function(contents, scrollManager) {
    const elmBg = document.querySelector('.js-background');

    elmBg.classList.add('is-scale')
  },
}
