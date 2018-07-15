const viewportUnitsBuggyfill = require('viewport-units-buggyfill');
const Pjax = require('./modules/pjax/Pjax').default;
const ScrollManager = require('./modules/smooth_scroll_manager/SmoothScrollManager').default;
const Renderer = require('./modules/common/Renderer').default;

const modules = {
  pjax: new Pjax(),
  scrollManager: new ScrollManager(),
};
const renderer = new Renderer(modules);
const ua = window.navigator.userAgent;
const link = document.querySelector('link[as=style]');

// connect core modules each other.
modules.pjax.modules = modules;
modules.scrollManager.modules = modules;

// preload stylesheet other than Google Chrome browser.
if (ua.indexOf('Chrome') < 0) link.rel = 'stylesheet';

setTimeout(() => {
  // Making viewport units (vh|vw|vmin|vmax) work properly in Mobile Safari.
  viewportUnitsBuggyfill.init();

  // start to run Pjax.
  modules.pjax.onLoad().then(() => {
    renderer.start();
  });
}, 100);
