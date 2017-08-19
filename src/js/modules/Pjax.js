const CLASSNAME_LINK = '.js-pjax-link';
const CLASSNAME_CONTENTS = '.js-pjax-contents';
const CLASSNAME_FIXED_BEFORE = '.js-pjax-fixed-before';
const CLASSNAME_FIXED_AFTER = '.js-pjax-fixed-after';

const page = {
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
    this.elmPage = document.querySelector('.l-page');
    this.elmContents = document.querySelector(CLASSNAME_CONTENTS);
    this.elmFixedBefore = document.querySelector(CLASSNAME_FIXED_BEFORE);
    this.elmFixedAfter = document.querySelector(CLASSNAME_FIXED_AFTER);
    this.elmOverlay = document.querySelector('.js-pjax-overlay');
    this.elmProgress = document.querySelector('.js-pjax-progress');
    this.href = location.pathname;
    this.page = null;
    this.isAnimate = false;
    this.isPopState = false;
    this.selectPageFunc();
    this.init();
    this.on();
  }
  selectPageFunc() {
    switch (this.elmPage.dataset.pageId) {
      case 'index':  this.page = page.index; break;
      case 'page01': this.page = page.page01; break;
      case 'page02': this.page = page.page02; break;
      case 'page03': this.page = page.page03; break;
      default:
        this.page = {
          preload: function(callback) {
            callback();
          }
        }
    }
  }
  init() {
    page.common(this.elmContents, this.scrollManager, this.isPageLoaded);
    if (this.page) this.page.init(this.elmContents, this.scrollManager);
  }
  send() {
    this.scrollManager.isWorkingSmooth = false;
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
    this.elmPage.dataset.pageId = responsePage.dataset.pageId;
    this.elmContents.innerHTML = responseContents.innerHTML;
    document.title = responseHtml.querySelector('title').innerHTML;

    // ページの初期化関数オブジェクトを選択
    this.selectPageFunc();

    // ページの初期スクロール値を設定
    window.scrollTo(0, 0);

    // Scroll Managerの初期化
    this.page.preload(() => {
      setTimeout(() => {
        this.scrollManager.initScrollItems();
        this.scrollManager.initHookes();
        this.scrollManager.start();
        this.transitEnd();
      }, 100);
    })
  }
  transitStart() {
    // ページ切り替え前の演出
    if (this.isAnimate) return;
    this.isAnimate = true;
    this.scrollManager.isWorking = false;
    this.elmOverlay.classList.remove('is-shrink');
    this.elmOverlay.classList.add('is-expand');
    this.elmProgress.classList.add('is-shown');
  }
  transitEnd() {
    // ページ切り替え後の演出
    setTimeout(() => {
      this.elmOverlay.classList.remove('is-expand');
      this.elmOverlay.classList.add('is-shrink');
      this.elmProgress.classList.add('is-hidden');
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
      history.scrollRestoration = 'manual';
      this.transitStart();
    });

    this.elmOverlay.addEventListener('transitionend', () => {
      if (this.elmOverlay.classList.contains('is-expand')) {
        // オーバーレイが展開したあとの処理
        this.href = location.pathname;
        this.send();
      } else {
        // オーバーレイが収縮したあとの処理
        this.isAnimate = false;
        this.elmProgress.classList.remove('is-shown');
        this.elmProgress.classList.remove('is-hidden');
        // history.back連打によって、読み込まれた本文とlocation.pathnameが異なる場合、自動的に再度読み込みを行う。
        if (this.href !== location.pathname) {
          this.transitStart();
          return;
        }
        // Pjax遷移イベント設定
        this.onPjaxLinks(this.elmContents);
        this.init();
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
        history.pushState(null, null, href);
        this.transitStart();
      });
    }
  }
}
