const Pjax = require('./modules/pjax_with_preload/PjaxWithPreload').default;
const ScrollManager = require('./modules/smooth_scroll_manager/SmoothScrollManager').default;

const pjax = new Pjax();
const scrollManager = new ScrollManager();

// connect core modules each other.
pjax.modules = {
  scrollManager: scrollManager,
};

const init = () => {
  pjax.elm.progress.classList.add('is-shown');
  setTimeout(() => {
    pjax.onLoad();
  }, 500);
}
init();
