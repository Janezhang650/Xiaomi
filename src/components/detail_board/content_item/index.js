import './index.scss';
import tpl from './index.tpl';

import { tplReplace } from '../../../utils/tools';

class DetailContent {
  constructor () {
    this.name = 'detailContent';
  }

  tpl (content, price, pic, name, index) {
    return tplReplace(tpl, {
      content,
      price: price ? price + '元' : '',
      pic,
      name,
      default_price: price,
      isCurrent: index === 0 ? 'current' : ''
    });
  }
}

export { DetailContent }