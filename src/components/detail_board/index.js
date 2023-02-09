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
    this.initPhoneInfo();
    this.render();
    this.initUserPhoneInfo();
    this.bindEvent();
  }

  // 将传递过来的数据进行格式化
  initPhoneInfo () {
    const data = this.data;

    this.data.version_info = $.parseJSON(data.version_info);
    this.data.color = $.parseJSON(data.color);
    this.data.pics = $.parseJSON(data.pics);
  }

  // 初始化用户自定义手机配置数据
  initUserPhoneInfo () {
    const data = this.data,
          versions = data.version_info;

    this.userPhoneInfo = {
      id: data.id,
      version: versions[0].version,
      price: versions[0].price,
      color: data.color[0],
      pic: data.pics[0][0][0]
    };
  }

  render () {
    const data = this.data;

    let colorList = '',
        versionList = '';

    data.color.map((item, idx) => {
      colorList += this.detailContent.tpl(item, null, data.pics[idx][idx][0], idx);
    });

    data.version_info.map((item, idx) => {
      versionList += this.detailContent.tpl(item.version, item.price, null, idx);
    });
    
    this.$el.append(tplReplace(tpl, {
      pic: data.pics[0][0][0],
      phone_name: data.phone_name,
      slogan: data.slogan,
      default_price: data.default_price,
      title_1: this.detailTitle.tpl('手机版本'),
      title_2: this.detailTitle.tpl('手机颜色'),
      versions: versionList,
      colors: colorList
    }));
  }

  bindEvent () {
    const $versions = this.$el.find('.J_versions'),
          $colors = this.$el.find('.J_colors');

    this.$versionItems = $versions.children('.content-item');
    this.$colorItems = $colors.children('.content-item');
    this.$phonePic = this.$el.find('.J_phonePic');

    $versions.on('click', '.content-item', $.proxy(this.onVersionClick, this));
    $colors.on('click', '.content-item', $.proxy(this.onColorClick, this));
  }

  onVersionClick (event) {
    const e = event || window.event,
          $tar = $(e.target);

    this.versionChange($tar);
  }

  onColorClick (event) {
    const e = event || window.event,
          $tar = $(e.target);

    this.colorChange($tar);
  }

  // 更改手机版本与价格
  versionChange (target) {
    const curIdx = target.index();

    this.userPhoneInfo.version = target.attr('data-content'); // 更改用户自定义手机版本
    this.userPhoneInfo.price = target.attr('data-price'); // 更改用户自定义手机价格

    this.$versionItems.eq(curIdx).addClass('current')
          .siblings().removeClass('current');
  }

  colorChange (target) {
    const curIdx = target.index();

    this.userPhoneInfo.color = target.attr('data-content'); // 更改用户自定义手机颜色
    this.userPhoneInfo.pic = target.attr('data-pic'); // 更改用户自定义手机图片
    this.$phonePic.attr('src', target.attr('data-pic')); // 更改显示的图片

    this.$colorItems.eq(curIdx).addClass('current')
          .siblings().removeClass('current');
  }
}

export { DetailBoard };