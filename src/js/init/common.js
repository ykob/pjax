import Hover from 'js-util/Hover.js';

module.exports = function(contents, scrollManager, isPageLoaded) {
  const doc = (isPageLoaded) ? contents : document;
  const elmHover = doc.querySelectorAll('.js-hover');
  for (var i = 0; i < elmHover.length; i++) {
    new Hover(elmHover[i]);
  }
};
