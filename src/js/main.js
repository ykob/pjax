const viewportUnitsBuggyfill = require('viewport-units-buggyfill');
const ScrollManager = require('./modules/smooth_scroll_manager/SmoothScrollManager').default;
const Pjax = require('./modules/pjax/Pjax').default;

const scrollManager = new ScrollManager();
const pjax = new Pjax({
  scrollManager: scrollManager
});

// Apply the polyfill fixes the bug that Mobile Safari return a wrong vh value.
viewportUnitsBuggyfill.init();

const init = () => {
  pjax.onLoad();
}
init();
