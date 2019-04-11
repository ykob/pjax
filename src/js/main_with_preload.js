import '@babel/polyfill';

import UaParser from 'ua-parser-js';
import sleep from 'js-util/sleep';
import Pjax from './modules/pjax_with_preload/PjaxWithPreload';
import ScrollManager from './modules/smooth_scroll_manager/SmoothScrollManager';
import Renderer from './modules/common/Renderer';

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
