const ScrollManager = require('./modules/smooth_scroll_manager/SmoothScrollManager').default;
const Pjax = require('./modules/Pjax').default;

const scrollManager = new ScrollManager();
const pjax = new Pjax(scrollManager);

const init = () => {
  pjax.elmProgress.classList.add('is-shown');
  setTimeout(() => {
    pjax.onLoad();
  }, 500);
}
init();
