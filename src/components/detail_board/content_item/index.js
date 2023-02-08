import './index.scss';
import tpl from './index.tpl';

import { tplReplace } from '../../../utils/tools';

class DetailContent {
  constructor () {
    this.name = 'detailContent';
  }

  tpl (content, price, index) {
    return tplReplace(tpl, {
      content,
      price: price ? price + '元' : '',
      isCurrent: index === 0 ? 'current' : ''
    });
  }
}

export { DetailContent }