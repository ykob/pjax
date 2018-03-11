const ScrollManager = require('./modules/smooth_scroll_manager/SmoothScrollManager').default;
const Pjax = require('./modules/pjax/Pjax').default;

const scrollManager = new ScrollManager();
const pjax = new Pjax({
  scrollManager: scrollManager
});

const init = () => {
  pjax.onLoad();
}
init();
