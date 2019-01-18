import loadImgs from '../../common/loadImgs';

// initBeforeTransit method: before scrollManager.resize run.
const initBeforeTransit = async (contents, contentsBefore, contentsAfter, modules) => {
  await loadImgs([
    '../img/index/bg.jpg',
  ]);
};

// initAfterTransit method: after scrollManager.resize run.
const initAfterTransit = (contents, contentsBefore, contentsAfter, modules) => {
};

// clear any variables.
const clear = (modules) => {
};

export {
  initBeforeTransit,
  initAfterTransit,
  clear
}
