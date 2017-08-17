const CLASSNAME_LINK = '.js-pjax-link';
const CLASSNAME_CONTENTS = '.js-pjax-contents';
const CLASSNAME_FIXED_BEFORE = '.js-pjax-fixed-before';
const CLASSNAME_FIXED_AFTER = '.js-pjax-fixed-after';
const CLASSNAME_OVERLAY = '.js-pjax-overlay';

const init = {
  common: require('../init/common.js'),
  index: require('../init/index.js'),
  page01: require('../init/page01.js'),
  page02: require('../init/page02.js'),
  page03: require('../init/page03.js'),
};

export default class Pjax {
  constructor(scrollManager) {
    this.scrollManager = scrollManager;
    this.xhr = new XMLHttpRequest();
    this.page = document.querySelector('.l-page');
    this.contents = document.querySelector(CLASSNAME_CONTENTS);
    this.fixedBefore = document.querySelector(CLASSNAME_FIXED_BEFORE);
    this.fixedAfter = document.querySelector(CLASSNAME_FIXED_AFTER);
    this.overlay = document.querySelector(CLASSNAME_OVERLAY);
    this.href = location.pathname;
    this.isAnimate = false;
    this.isPopState = false;
    this.init();
    this.on();
  }
  init() {
    init.common(this.contents, this.scrollManager, this.isPageLoaded);
    switch (this.page.dataset.pageId) {
      case 'index': init.index(this.contents, this.scrollManager); break;
      case 'page01': init.page01(this.contents, this.scrollManager); break;
      case 'page02': init.page02(this.contents, this.scrollManager); break;
      case 'page03': init.page03(this.contents, this.scrollManager); break;
      default:
    }
  }
  send() {
    this.scrollManager.stop();
    this.xhr.open('GET', this.href, true);
    this.xhr.send();
  }
  replaceContent() {
    // 次のページを取得
    const responseHtml = document.createElement('div');
    responseHtml.innerHTML = this.xhr.responseText;
    const responsePage = responseHtml.querySelector('.l-page');
    const responseContents = responseHtml.querySelector(CLASSNAME_CONTENTS);
    const responseFixedBefore = responseHtml.querySelector(CLASSNAME_FIXED_BEFORE);
    const responseFixedAfter = responseHtml.querySelector(CLASSNAME_FIXED_AFTER);

    // ページの中身を差し替え
    this.page.dataset.pageId = responsePage.dataset.pageId;
    this.contents.innerHTML = responseContents.innerHTML;
    document.title = responseHtml.querySelector('title').innerHTML;

    // Pjax遷移イベント設定
    this.onPjaxLinks(this.contents);
    this.init();

    // ページの初期スクロール値を設定
    window.scrollTo(0, 0);

    // Scroll Managerの初期化
    setTimeout(() => {
      this.scrollManager.init();
      this.scrollManager.start();
      this.transitEnd();
    }, 100);
  }
  transitStart() {
    // ページ切り替え前の演出
    if (this.isAnimate) return;
    this.isAnimate = true;
    this.scrollManager.isWorking = false;
    this.overlay.classList.remove('is-shrink');
    this.overlay.classList.add('is-expand');
  }
  transitEnd() {
    // ページ切り替え後の演出
    setTimeout(() => {
      this.overlay.classList.remove('is-expand');
      this.overlay.classList.add('is-shrink');
    }, 100);
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
      this.transitStart();
    });

    this.overlay.addEventListener('transitionend', () => {
      if (this.overlay.classList.contains('is-expand')) {
        // オーバーレイが展開したあとの処理
        this.href = location.pathname;
        this.send();
      } else {
        // オーバーレイが収縮したあとの処理
        this.isAnimate = false;
        // history.back連打によって、読み込まれた本文とlocation.pathnameが異なる場合、自動的に再度読み込みを行う。
        if (this.href !== location.pathname) {
          this.transitStart();
        }
      }
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
        if (href == location.pathname) return;
        window.history.pushState(null, null, href);
        this.transitStart();
      });
    }
  }
}
