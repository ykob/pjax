import Hover from 'js-util/Hover.js';

const init = {
  common: require('../init/common.js')
};

export default class Pjax {
  constructor(scrollManager) {
    this.scrollManager = scrollManager;
    this.xhr = new XMLHttpRequest();
    this.on();
  }
  replaceContent() {
    document.querySelector('l-page').getAttribute('data-page-id');
  }
  transitStart() {

  }
  transitEnd() {

  }
  on() {

  }
}
