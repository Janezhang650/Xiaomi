import './index.scss';
import navTpl from './tpl/nav.tpl';
import navItemTpl from './tpl/nav_item.tpl';
import { NavMenu } from './navMenu';

import { tplReplace } from '../../../utils/tools';

class Nav {
  constructor () {
    this.name = 'nav';
    this.htmlCache = {}; // 模板缓存池

    this.navMenu = new NavMenu();
  }

  tpl (data) {
    let list = '';

    data.map(item => {
      list += tplReplace(navItemTpl, {
        field: item.field,
        seriesName: item.series_name
      });
    });

    return tplReplace(navTpl, {
      navItems: list,
      navMenu: this.navMenu.tpl()
    });
  }

  navMouseIn (e) {
    const data = e.data,
          phoneData = data.phoneData,
          oNav = data.oNav,
          $navMenu = $('.J_navMenu'),
          field = $(this).attr('data-field');

    if (!oNav.htmlCache[field]) {
      oNav.htmlCache[field] = oNav.navMenu.appendMenuCards(phoneData.filter(item => {
        return item.field === field;
      }))
    }
    $navMenu.html(oNav.htmlCache[field]);
  }
}

export { Nav }