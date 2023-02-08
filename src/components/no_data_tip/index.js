import './index.scss';
import tpl from './index.tpl';

import { tplReplace } from '../../utils/tools';

class NoDataTip {
  constructor () {
    this.name = 'noDataTip';
  }

  tpl (tip) {
    return tplReplace(tpl, { tip });
  }
}

export { NoDataTip }