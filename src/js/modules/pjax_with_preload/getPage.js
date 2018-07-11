export default function(pageId, page) {
  switch (pageId) {
    case 'index':
      return page.index;
      break;
    case 'page01':
    case 'page02':
    case 'page03':
      return page.lower;
      break;
    default:
      return page.blank;
  }
}
