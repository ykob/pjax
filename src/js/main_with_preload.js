const viewportUnitsBuggyfill = require('viewport-units-buggyfill');
const Pjax = require('./modules/pjax_with_preload/PjaxWithPreload').default;
const ScrollManager = require('./modules/smooth_scroll_manager/SmoothScrollManager').default;

const coreModules = {
  pjax: new Pjax(),
  scrollManager: new ScrollManager(),
};
const ua = window.navigator.userAgent;
const link = document.querySelector('link[as=style]');

// connect core modules each other.
coreModules.pjax.modules = coreModules;
coreModules.scrollManager.modules = coreModules;

// preload stylesheet other than Google Chrome browser.
if (ua.indexOf('Chrome') < 0) link.rel = 'stylesheet';

setTimeout(() => {
  // start to run Pjax.
  coreModules.pjax.elm.progress.classList.add('is-shown');
  setTimeout(() => {
    coreModules.pjax.onLoad();
  }, 500);
}, 100);
