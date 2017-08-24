import loadImage from '../modules/loadImage';

module.exports = {
  preload: function(callback) {
    loadImage([
      '/pjax/img/page02/bg.jpg'
    ], callback);
  },
  init: function(contents, scrollManager) {
    const title = contents.querySelector('.p-lower-header__title');
    const excerpt = contents.querySelector('.p-lower-header__excerpt');

    title.classList.add('is-shown');
    excerpt.classList.add('is-shown');
  }
};
