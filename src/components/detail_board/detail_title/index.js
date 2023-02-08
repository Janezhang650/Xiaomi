import './index.scss';
import tpl from './index.tpl';

import { tplReplace } from '../../../utils/tools';

class DetailTitle {
  constructor () {
    this.name = 'detailTitle';
  }

  tpl (title) {
    return tplReplace(tpl, { title });
  }
}

export { DetailTitle }