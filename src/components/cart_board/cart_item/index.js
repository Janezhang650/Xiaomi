import './index.scss';
import tpl from './index.tpl';

import { tplReplace } from '../../../utils/tools';

class CartItem {
  constructor () {
    this.name = 'cartItem';
  }

  tpl (data) {
    return tplReplace(tpl, {
      goodsId: data.goodsId,
      link: data.link,
      pic: data.pic,
      name: data.name,
      price: data.price,
      version: data.version,
      color: data.color
    });
  }
}

export { CartItem }