import loadContentImgs from '../../common/loadContentImgs';

// initBeforeTransit method: before scrollManager.resize run.
const initBeforeTransit = async (contents, contentsBefore, contentsAfter, modules) => {
  await loadContentImgs(contents, [
    '../img/page01/bg.jpg',
    '../img/page02/bg.jpg',
    '../img/page03/bg.jpg',
  ]);
};

// initAfterTransit method: after scrollManager.resize run.
const initAfterTransit = (contents, contentsBefore, contentsAfter, modules) => {
};

// clear any variables.
const clear = (modules) => {
};

export default {
  initBeforeTransit,
  initAfterTransit,
  clear
}
