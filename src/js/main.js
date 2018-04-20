const viewportUnitsBuggyfill = require('viewport-units-buggyfill');
const Pjax = require('./modules/pjax/Pjax').default;
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
  // Making viewport units (vh|vw|vmin|vmax) work properly in Mobile Safari.
  viewportUnitsBuggyfill.init();

  // start to run Pjax.
  coreModules.pjax.onLoad();
}, 100);
