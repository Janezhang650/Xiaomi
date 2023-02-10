import './index.scss';
import tpl from './index.tpl';

import { tplReplace } from '../../../utils/tools';

class OrderItem {
  constructor () {
    this.name = 'orderItem';
  }

  tpl (data) {
    return tplReplace(tpl, {
      orderId: data.orderId,
      link: data.link,
      pic: data.pic,
      name: data.name,
      price: data.price,
      version: data.version,
      color: data.color
    });
  }
}

export { OrderItem }