import ScrollManager from './modules/SmoothScrollManager';
import Pjax from './modules/Pjax';

const scrollManager = new ScrollManager();
const pjax = new Pjax(scrollManager);

const init = () => {
  scrollManager.start();
}
init();
