const viewportUnitsBuggyfill = require('viewport-units-buggyfill');
const Pjax = require('./modules/pjax/Pjax').default;
const ScrollManager = require('./modules/smooth_scroll_manager/SmoothScrollManager').default;

const scrollManager = new ScrollManager();
const pjax = new Pjax();

const ua = window.navigator.userAgent;
const link = document.querySelector('link[as=style]');

// connect core modules each other.
pjax.modules = {
  scrollManager: scrollManager,
};

// preload stylesheet other than Google Chrome browser.
if (ua.indexOf('Chrome') < 0) link.rel = 'stylesheet';

setTimeout(() => {
  // Making viewport units (vh|vw|vmin|vmax) work properly in Mobile Safari.
  viewportUnitsBuggyfill.init();

  // start to run Pjax.
  pjax.onLoad();
}, 100);
