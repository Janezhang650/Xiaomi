import './index.scss';
import tpl from './index.tpl';

import { DetailTitle } from './detail_title';
import { DetailContent } from './content_item';

import { tplReplace } from '../../utils/tools';

class DetailBoard {
  constructor (el, data) {
    this.name = 'detailBoard';
    this.$el = el;
    this.data = data;
    this.detailTitle = new DetailTitle();
    this.detailContent = new DetailContent();
  }

  init () {
    this.render();
  }

  render () {
    const data = this.data,
          colors = $.parseJSON(data.color),
          versions = $.parseJSON(data.version_info);

    let colorList = '',
        versionList = '';

    colors.map((item, idx) => {
      colorList += this.detailContent.tpl(item, null, idx);
    });

    versions.map((item, idx) => {
      versionList += this.detailContent.tpl(item.version, item.price, idx);
    });
    
    this.$el.append(tplReplace(tpl, {
      pic: $.parseJSON(data.pics)[0][0][0],
      phone_name: data.phone_name,
      slogan: data.slogan,
      default_price: data.default_price,
      title_1: this.detailTitle.tpl('手机版本'),
      title_2: this.detailTitle.tpl('手机颜色'),
      versions: versionList,
      colors: colorList
    }))
  }
}

export { DetailBoard };