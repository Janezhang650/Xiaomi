import './index.scss';
import tpl from './tpl/board.tpl';
import itemTpl from './tpl/item.tpl';

import { NoDataTip } from '../no_data_tip';

import { tplReplace } from '../../utils/tools';

class ShowBoard {
  constructor (el, data) {
    this.name = 'showBoard';
    this.$el = el;
    this.data = data;
  }

  init () {
    this.render();
  }

  render () {
    this.$el.append(tplReplace(tpl, {
      list: this.renderList(this.data) || new NoDataTip.tpl('暂无相关数据')
    }));
  }

  renderList (data) {
    let list = '';

    data.forEach((item, idx) => {
      list += tplReplace(itemTpl, {
        id: item.id,
        phone_name: item.phone_name,
        pic: $.parseJSON(item.pics)[0][0][0],
        slogan: item.slogan.substr(0, 10),
        default_price: item.default_price,
        isFirst: idx % 5 === 0 ? 'first' : ''
      });
    });

    return list;
  }
}

export { ShowBoard }
