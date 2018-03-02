const CLASSNAME_LINK = 'js-pjax-link';
const CLASSNAME_LINK_MOMENT = 'js-pjax-link-moment';
const CLASSNAME_PAGE = 'js-pjax-page';
const CLASSNAME_CONTENTS = 'js-pjax-contents';
const CLASSNAME_FIXED_BEFORE = 'js-pjax-fixed-before';
const CLASSNAME_FIXED_AFTER = 'js-pjax-fixed-after';

const page = {
  common: require('../init/common.js'),
  blank: require('../init/blank.js'),
  index: require('../init/index.js'),
  page01: require('../init/page01.js'),
  page02: require('../init/page02.js'),
  page03: require('../init/page03.js'),
};

export default class Pjax {
  constructor(scrollManager) {
    this.scrollManager = scrollManager;
    this.xhr = new XMLHttpRequest();
    this.elmPage = document.querySelector(`.${CLASSNAME_PAGE}`);
    this.elmContents = document.querySelector(`.${CLASSNAME_CONTENTS}`);
    this.elmFixedBefore = document.querySelector(`.${CLASSNAME_FIXED_BEFORE}`);
    this.elmFixedAfter = document.querySelector(`.${CLASSNAME_FIXED_AFTER}`);
    this.elmOverlay = document.querySelector('.js-pjax-overlay');
    this.elmProgress = document.querySelector('.js-pjax-progress');
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
    this.page.preload(this.elmContents, this.elmFixedBefore, this.elmFixedAfter, this.scrollManager, () => {
      // Pjaxの初期ロード処理を行ったのちにScroll Managerを開始
      this.scrollManager.start(() => {
        // ページごとの、遷移演出終了前に実行する初期化処理
        page.common.initBeforeTransit(document, null, null, this.scrollManager, this.isPageLoaded);
        this.page.initBeforeTransit(this.elmContents, this.elmFixedBefore, this.elmFixedAfter, this.scrollManager);

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
    switch (this.elmPage.dataset.pageId) {
      case 'index':  this.page = page.index; break;
      case 'page01': this.page = page.page01; break;
      case 'page02': this.page = page.page02; break;
      case 'page03': this.page = page.page03; break;
      default:
        this.page = page.blank;
    }
  }
  send() {
    // XMLHttpRequestの通信開始
    this.scrollManager.off();
    this.xhr.open('GET', this.href, true);
    this.xhr.send();
  }
  replaceContent() {
    // 前ページの変数を空にするclear関数を実行
    this.page.clear();

    // 次のページを取得
    const responseHtml = document.createElement('div');
    responseHtml.innerHTML = this.xhr.responseText;
    const responsePage = responseHtml.querySelector(`.${CLASSNAME_PAGE}`);
    const responseContents = responseHtml.querySelector(`.${CLASSNAME_CONTENTS}`);
    const responseFixedBefore = responseHtml.querySelector(`.${CLASSNAME_FIXED_BEFORE}`);
    const responseFixedAfter = responseHtml.querySelector(`.${CLASSNAME_FIXED_AFTER}`);

    // ページの中身を差し替え
    this.elmPage.dataset.pageId = responsePage.dataset.pageId;
    this.elmContents.innerHTML = responseContents.innerHTML;
    this.elmFixedBefore.innerHTML = responseFixedBefore.innerHTML;
    this.elmFixedAfter.innerHTML = responseFixedAfter.innerHTML;
    document.title = responseHtml.querySelector('title').innerHTML;

    // Google Analytics の集計処理。
    if (window.ga) ga('send', 'pageview', window.location.pathname.replace(/^\/?/, '/') + window.location.search);

    // ページのトップに戻る
    window.scrollTo(0, 0);

    // ページの初期化関数オブジェクトを選択
    this.selectPageFunc();

    // ページごとのプリロード処理
    this.page.preload(this.elmContents, this.elmFixedBefore, this.elmFixedAfter, this.scrollManager, () => {
      // 差し替えたページの本文に対しての非同期遷移のイベント設定
      this.onPjaxLinks(this.elmContents, this.elmFixedBefore, this.elmFixedAfter);

      // Scroll Managerの初期化
      this.scrollManager.start(() => {
        // ページごとの、遷移演出終了前に実行する初期化処理
        page.common.initBeforeTransit(this.elmContents, this.elmFixedBefore, this.elmFixedAfter, this.scrollManager, this.isPageLoaded);
        this.page.initBeforeTransit(this.elmContents, this.elmFixedBefore, this.elmFixedAfter, this.scrollManager);

        // 遷移演出の終了
        this.transitEnd();
      });
    });
  }
  transitStart(withAnime) {
    // ページ切り替え前の演出
    if (this.isAnimate) return;
    this.isAnimate = true;
    this.scrollManager.pause();
    this.elmOverlay.classList.remove('is-shrink');

    // オーバーレイのアニメを省略するか否かの判定
    if (withAnime) {
      this.elmOverlay.classList.add('is-expand');
      this.elmProgress.classList.add('is-shown');
    } else {
      this.elmOverlay.classList.add('is-expand-moment');
      this.elmProgress.classList.add('is-shown-moment');
      this.href = location.pathname + location.search;
      this.send();
    }
  }
  transitEnd() {
    // ページ切り替え後の演出
    setTimeout(() => {
      this.elmOverlay.classList.remove('is-expand');
      this.elmOverlay.classList.remove('is-expand-moment');
      this.elmOverlay.classList.add('is-shrink');
      this.elmProgress.classList.add('is-hidden');
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
    this.elmOverlay.addEventListener('transitionend', () => {
      if (this.elmOverlay.classList.contains('is-expand')) {
        // オーバーレイが展開したあとの処理
        this.href = location.pathname + location.search;
        this.send();
      } else {
        // オーバーレイが収縮したあとの処理
        this.isAnimate = false;
        this.elmProgress.classList.remove('is-shown');
        this.elmProgress.classList.remove('is-shown-moment');
        this.elmProgress.classList.remove('is-hidden');
        // history.back連打によって、読み込まれた本文とその瞬間に表示されているURIが異なる場合、自動的に再度読み込みを行う。
        if (this.href !== location.pathname + location.search) {
          this.transitStart(true);
          return;
        }
        // ページごとの、遷移演出終了後に実行する初期化処理
        page.common.initAfterTransit(this.elmContents, this.elmFixedBefore, this.elmFixedAfter, this.scrollManager);
        this.page.initAfterTransit(this.elmContents, this.elmFixedBefore, this.elmFixedAfter, this.scrollManager);
      }
    });
  }
  onPjaxLinks(content, fixedBefore, fixedAfter) {
    // 非同期遷移のイベント設定は頻発するため、処理を独立させた。
    const elms = [
      content.getElementsByTagName('a'),
      (fixedBefore) ? fixedBefore.getElementsByTagName('a') : [],
      (fixedAfter) ? fixedAfter.getElementsByTagName('a') : [],
    ];

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
      for (var j = 0; j < elms[i].length; j++) {
        const elm = elms[i][j];
        const href = elm.getAttribute('href');
        const target = elm.getAttribute('target');
        if (
          elm.classList.contains(CLASSNAME_LINK)
          || !(href.match(/^http/) || target === '_blank')
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
}
