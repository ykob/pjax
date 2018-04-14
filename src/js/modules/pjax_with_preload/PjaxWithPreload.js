/**
* Pjax
*
* Copyright (c) 2018 Yoichi Kobayashi
* Released under the MIT license
* http://opensource.org/licenses/mit-license.php
*/

const ConsoleSignature = require('../common/ConsoleSignature').default;

const consoleSignature = new ConsoleSignature('page transition in this website with original pjax module', 'https://github.com/ykob/pjax', '#497');

const CLASSNAME_LINK = 'js-pjax-link';
const CLASSNAME_LINK_MOMENT = 'js-pjax-link-moment';
const CLASSNAME_PAGE = 'js-pjax-page';
const CLASSNAME_CONTENTS = 'js-pjax-contents';

const page = {
  common: require('./init/common.js'),
  blank: require('./init/blank.js'),
  index: require('./init/index.js'),
  page01: require('./init/page01.js'),
  page02: require('./init/page02.js'),
  page03: require('./init/page03.js'),
};

export default class PjaxWithPreload {
  constructor() {
    this.modules = null;
    this.xhr = new XMLHttpRequest();
    this.elm = {
      page: document.querySelector(`.${CLASSNAME_PAGE}`),
      contents: document.querySelector(`.${CLASSNAME_CONTENTS}`),
      overlay: document.querySelector('.js-pjax-overlay'),
      progress: document.querySelector('.js-pjax-progress'),
    };
    this.href = location.pathname + location.search;
    this.page = null;
    this.isAnimate = false;
    this.isPageLoaded = false;

    this.on();
  }
  onLoad() {
    // ページが最初に読み込まれた際の処理
    this.selectPageFunc();

    // ページごとのプリロード処理
    this.page.preload(this.elm.contents, this.modules, () => {
      // Pjaxの初期ロード処理を行ったのちにScroll Managerを開始
      this.modules.scrollManager.start(() => {
        // ページごとの、遷移演出終了前に実行する初期化処理
        page.common.initBeforeTransit(document, this.modules, this.isPageLoaded);
        this.page.initBeforeTransit(this.elm.contents, this.modules);

        // 初期ロード後の非同期遷移のイベント設定
        this.onPjaxLinks(document);

        // 遷移演出の終了
        this.transitEnd();

        // ロード完了のフラグを立てる
        this.isPageLoaded = true;
      });
    });
  }
  selectPageFunc() {
    // ページごと個別に実行する関数の選択
    switch (this.elm.page.dataset.pageId) {
      case 'index':
        this.page = page.index;
        break;
      case 'page01':
        this.page = page.page01;
        break;
      case 'page02':
        this.page = page.page02;
        break;
      case 'page03':
        this.page = page.page03;
        break;
      default:
        this.page = page.blank;
    }
  }
  send() {
    // XMLHttpRequestの通信開始
    this.modules.scrollManager.off();
    this.xhr.open('GET', this.href, true);
    this.xhr.send();
  }
  replaceContent() {
    // 前ページの変数を空にするclear関数を実行
    this.page.clear(this.modules);

    // 次のページを取得
    const responseHtml = document.createElement('div');
    responseHtml.innerHTML = this.xhr.responseText;
    const responsePage = responseHtml.querySelector(`.${CLASSNAME_PAGE}`);
    const responseContents = responseHtml.querySelector(`.${CLASSNAME_CONTENTS}`);

    // ページの中身を差し替え
    this.elm.page.dataset.pageId = responsePage.dataset.pageId;
    this.elm.contents.innerHTML = responseContents.innerHTML;
    document.title = responseHtml.querySelector('title').innerHTML;

    // Google Analytics の集計処理。
    if (window.ga) ga('send', 'pageview', window.location.pathname.replace(/^\/?/, '/') + window.location.search);

    // ページのトップに戻る
    window.scrollTo(0, 0);

    // ページの初期化関数オブジェクトを選択
    this.selectPageFunc();

    // ページごとのプリロード処理
    this.page.preload(this.elm.contents, this.modules, () => {
      // 差し替えたページの本文に対しての非同期遷移のイベント設定
      this.onPjaxLinks(this.elm.contents);

      // Scroll Managerの初期化
      this.modules.scrollManager.start(() => {
        // ページごとの、遷移演出終了前に実行する初期化処理
        page.common.initBeforeTransit(this.elm.contents, this.modules, this.isPageLoaded);
        this.page.initBeforeTransit(this.elm.contents, this.modules);

        // 遷移演出の終了
        this.transitEnd();
      });
    });
  }
  transitStart(withAnime) {
    // ページ切り替え前の演出
    if (this.isAnimate) return;
    this.isAnimate = true;
    this.modules.scrollManager.pause();
    this.elm.overlay.classList.remove('is-shrink');

    // オーバーレイのアニメを省略するか否かの判定
    if (withAnime) {
      this.elm.overlay.classList.add('is-expand');
      this.elm.progress.classList.add('is-shown');
    } else {
      this.elm.overlay.classList.add('is-expand-moment');
      this.elm.progress.classList.add('is-shown-moment');
      this.href = location.pathname + location.search;
      this.send();
    }
  }
  transitEnd() {
    // ページ切り替え後の演出
    setTimeout(() => {
      this.elm.overlay.classList.remove('is-expand');
      this.elm.overlay.classList.remove('is-expand-moment');
      this.elm.overlay.classList.add('is-shrink');
      this.elm.progress.classList.add('is-hidden');
    }, 100);
  }
  on() {
    // 各イベントの設定
    // 非同期通信に関する処理
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
          switch (this.xhr.status) {
            case 200:
              this.replaceContent();
              break;
            case 404:
              console.error('Async request by Pjax has error, 404 not found.');
              this.replaceContent();
              break;
            case 500:
              console.error('Async request by Pjax has error, 500 Internal Server Error.');
              break;
            default:
          }
          break;
        default:
      }
    }

    // History API 関連の処理
    window.addEventListener('popstate', (event) => {
      event.preventDefault();
      history.scrollRestoration = 'manual';
      this.transitStart(true);
    });

    // 遷移演出の途中または終了時の処理
    this.elm.overlay.addEventListener('transitionend', () => {
      if (this.elm.overlay.classList.contains('is-expand')) {
        // オーバーレイが展開したあとの処理
        this.href = location.pathname + location.search;
        this.send();
      } else {
        // オーバーレイが収縮したあとの処理
        this.isAnimate = false;
        this.elm.progress.classList.remove('is-shown');
        this.elm.progress.classList.remove('is-shown-moment');
        this.elm.progress.classList.remove('is-hidden');
        // history.back連打によって、読み込まれた本文とその瞬間に表示されているURIが異なる場合、自動的に再度読み込みを行う。
        if (this.href !== location.pathname + location.search) {
          this.transitStart(true);
          return;
        }
        // ページごとの、遷移演出終了後に実行する初期化処理
        page.common.initAfterTransit(this.elm.contents, this.modules);
        this.page.initAfterTransit(this.elm.contents, this.modules);
      }
    });
  }
  onPjaxLinks(content) {
    // 非同期遷移のイベント設定は頻発するため、処理を独立させた。
    const elms = content.getElementsByTagName('a');

    // 非同期遷移のイベント内関数を事前に定義
    const transit = (href, withAnime) => {
      if (href == location.pathname + location.search) {
        return;
      }
      history.pushState(null, null, href);
      this.transitStart(withAnime);
    };

    // 事前に取得したアンカーリンク要素が非同期遷移の対象かどうかを判定し、イベントを付与する
    for (var i = 0; i < elms.length; i++) {
      const elm = elms[i];
      const href = elm.getAttribute('href');
      const target = elm.getAttribute('target');
      if (
        elm.classList.contains(CLASSNAME_LINK)
        || !(href.match(location.host) || target === '_blank')
      ) {
        elm.addEventListener('click', (event) => {
          event.preventDefault();
          transit(href, true);
        });
      }
      if (elm.classList.contains(CLASSNAME_LINK_MOMENT)) {
        elm.addEventListener('click', (event) => {
          event.preventDefault();
          transit(href, false);
        });
      }
    }
  }
}
