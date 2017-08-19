import ScrollManager from './modules/SmoothScrollManager';
import Pjax from './modules/Pjax';

const scrollManager = new ScrollManager();
const pjax = new Pjax(scrollManager);

const init = () => {
  pjax.elmProgress.classList.add('is-shown');
  setTimeout(() => {
    scrollManager.start(() => {
      pjax.onLoad();
    });
  }, 500);
}
init();
