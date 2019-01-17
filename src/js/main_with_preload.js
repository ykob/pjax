require('@babel/polyfill');

import UaParser from 'ua-parser-js';
const sleep = require('js-util/sleep');
const Pjax = require('./modules/pjax_with_preload/PjaxWithPreload').default;
const ScrollManager = require('./modules/smooth_scroll_manager/SmoothScrollManager').default;
const Renderer = require('./modules/common/Renderer').default;

const modules = {
  renderer: new Renderer(),
  pjax: new Pjax(),
  scrollManager: new ScrollManager(),
};
const uaParser = new UaParser();
const link = document.querySelector('link[as=style]');

// connect core modules each other.
modules.renderer.modules = modules;
modules.pjax.modules = modules;
modules.scrollManager.modules = modules;

const init = async () => {
  // preload stylesheet other than Google Chrome browser.
  const browser = uaParser.getBrowser().name;
  if (browser !== 'Chrome' && browser !== 'Edge') link.rel = 'stylesheet';

  await sleep(100);

  // add events.
  modules.renderer.render = () => {
    modules.scrollManager.render();
  }

  // start to run Pjax.
  await modules.pjax.onLoad();
  modules.renderer.start();
}
init();
