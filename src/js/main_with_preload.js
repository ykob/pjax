const ScrollManager = require('./modules/smooth_scroll_manager/SmoothScrollManager').default;
const Pjax = require('./modules/pjax_with_preload/PjaxWithPreload').default;

const scrollManager = new ScrollManager();
const pjax = new Pjax({
  scrollManager: scrollManager
});

const init = () => {
  pjax.elm.progress.classList.add('is-shown');
  setTimeout(() => {
    pjax.onLoad();
  }, 500);
}
init();
