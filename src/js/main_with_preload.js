const Pjax = require('./modules/pjax_with_preload/PjaxWithPreload').default;
const ScrollManager = require('./modules/smooth_scroll_manager/SmoothScrollManager').default;

const coreModules = {
  pjax: new Pjax(),
  scrollManager: new ScrollManager(),
};

// connect core modules each other.
coreModules.pjax.modules = coreModules;
coreModules.scrollManager.modules = coreModules;

coreModules.pjax.elm.progress.classList.add('is-shown');
setTimeout(() => {
  coreModules.pjax.onLoad();
}, 100);
