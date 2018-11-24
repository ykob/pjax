import loadContentImgs from '../../common/loadContentImgs';

// initBeforeTransit method: before scrollManager.resize run.
const initBeforeTransit = async (contents, modules) => {
};

// initAfterTransit method: after scrollManager.resize run.
const initAfterTransit = (contents, modules) => {
  const title = contents.querySelector('.p-index-header__title');
  const excerpt = contents.querySelector('.p-index-header__excerpt');

  title.classList.add('is-shown');
  excerpt.classList.add('is-shown');
};

// clear any variables.
const clear = (modules) => {
};

export {
  initBeforeTransit,
  initAfterTransit,
  clear
}
