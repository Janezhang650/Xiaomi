import './index.scss';
import navMenuTpl from './tpl/nav_menu.tpl';
import navMenuItemTpl from './tpl/menu_item.tpl';

import { tplReplace } from '../../../../utils/tools';

class NavMenu {
  constructor () {
    this.name = 'navMenu';
    this.tpl = navMenuTpl;
  }

  appendMenuCards (data) {
    let list = '';

    data.forEach((item, idx)=> {
      if (idx < 7) {
        list += tplReplace(navMenuItemTpl, {
          id: item.id,
          pic: $.parseJSON(item.pics)[0][0][0],
          default_price: item.default_price,
          isFirst: idx === 0 ? 'first': ''
        });
      }
    });

    return list;
  }
}

export { NavMenu }