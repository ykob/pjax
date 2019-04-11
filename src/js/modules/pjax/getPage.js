import blank from './init/blank';
import index from './init/index';
import lower from './init/lower';

export default function(pageId) {
  switch (pageId) {
    case 'index':
      return index;
      break;
    case 'page01':
    case 'page02':
    case 'page03':
      return lower;
      break;
    default:
      return blank;
  }
}
