import './index.scss';
import tpl from './index.tpl';

import { tplReplace } from '../../../utils/tools';

class CartBar {
  constructor () {
    this.name = 'cartBar';
  }

  tpl (totalPrice) {
    return tplReplace(tpl, { totalPrice });
  }
}

export { CartBar }