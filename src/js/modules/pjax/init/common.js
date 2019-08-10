import Hover from 'js-util/Hover';

// initBeforeTransit method: before scrollManager.resize run.
const initBeforeTransit = (contentsArr, modules, isPageLoaded) => {
  contentsArr.map((contents) => {
    // Bind the class to run the hover effect.
    [...contents.querySelectorAll('.js-hover')].map(elm => {
      new Hover(elm);
    });
  });

  // It distinguishes the initialize processes
  // immediately after the page loading and after the page transition.
  if (!isPageLoaded) {
    // the initializing immediately after loading the page.
  } else {
    // the initializing after the page transition.
  }
};

// initAfterTransit method: after scrollManager.resize run.
const initAfterTransit = (contentsArr, modules) => {
};

export default {
  initBeforeTransit,
  initAfterTransit,
}
