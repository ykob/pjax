module.exports = {
  preload: function(callback) {
    callback();
  },
  init: function(contents, scrollManager) {
    console.log('page03');

    const title = contents.querySelector('.p-lower-header__title');
    const excerpt = contents.querySelector('.p-lower-header__excerpt');

    title.classList.add('is-shown');
    excerpt.classList.add('is-shown');
  }
};
