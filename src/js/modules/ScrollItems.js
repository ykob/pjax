import ScrollItem from './ScrollItem';

export default class ScrollItems {
  constructor(scrollManager) {
    this.scrollManager = scrollManager;
    this.elmScrollItems = null;
    this.elmParallaxItems = null;
    this.scrollItems = [];
    this.parallaxItems = [];
  }
  init(contents) {
    this.elmScrollItems = contents.querySelectorAll('.js-scroll-item');
    this.scrollItems = [];
    for (var i = 0; i < this.elmScrollItems.length; i++) {
      this.scrollItems[i] = new ScrollItem(this.elmScrollItems[i]);
    }
  }
  scroll() {
    for (var i = 0; i < this.scrollItems.length; i++) {
      this.scrollItems[i].show(
        this.scrollManager.scrollTop + this.scrollManager.resolution.y,
        this.scrollManager.scrollTop
      );
    }
  }
  resize() {
    const scrollTop = window.pageYOffset;
    for (var i = 0; i < this.scrollItems.length; i++) {
      this.scrollItems[i].init(scrollTop);
    }
  }
  render() {
  }
}
