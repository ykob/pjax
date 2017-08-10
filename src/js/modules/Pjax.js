import Hover from 'js-util/Hover.js';

const CLASSNAME_LINK = '.js-pjax-link';
const CLASSNAME_CONTENTS = '.js-pjax-contents';

const init = {
  common: require('../init/common.js')
};

export default class Pjax {
  constructor(scrollManager) {
    this.scrollManager = scrollManager;
    this.xhr = new XMLHttpRequest();
    this.contents = document.querySelector(CLASSNAME_CONTENTS);
    this.isPopState = false;
    this.on();
  }
  send(href) {
    this.scrollManager.stop();
    this.xhr.open('GET', href, true);
    this.xhr.send();
  }
  replaceContent() {
    // 次のページを取得
    const page = document.createElement('div');
    page.innerHTML = this.xhr.responseText;
    const contents = page.querySelector(CLASSNAME_CONTENTS);

    // ページの中身を差し替え
    this.contents.innerHTML = contents.innerHTML;

    // Pjax遷移イベント設定
    this.onPjaxLinks(this.contents);

    // ページの初期スクロール値を設定
    window.scrollTo(0, 0);

    // Scroll Managerの初期化
    setTimeout(() => {
      this.scrollManager.init();
      this.scrollManager.start();
    }, 100);
  }
  transitStart() {

  }
  transitEnd() {

  }
  on() {
    this.xhr.onreadystatechange = () => {
      switch (this.xhr.readyState) {
        case 0: // UNSENT
          break;
        case 1: // OPENED
          break;
        case 2: // HEADERS_RECEIVED
          break;
        case 3: // LOADING
          break;
        case 4: // DONE
          if (this.xhr.status == 200) {
            this.replaceContent();
          } else {
          }
          break;
        default:
      }
    }

    window.addEventListener('popstate', (event) => {
      event.preventDefault();
      this.send(event.target.location.pathname);
    });

    this.onPjaxLinks(document);
  }
  onPjaxLinks(content) {
    const elms = content.querySelectorAll(CLASSNAME_LINK);
    for (var i = 0; i < elms.length; i++) {
      const elm = elms[i];
      const href = elm.getAttribute('href');
      elm.addEventListener('click', (event) => {
        event.preventDefault();
        window.history.pushState(null, null, href);
        this.send(href);
      });
    }
  }
}
