import './index.scss';
import tpl from './tpl/warpper.tpl';
import itemTpl from './tpl/item.tpl';
import indicatorTpl from './tpl/indicator.tpl';
import controlTpl from './tpl/control.tpl';

import { tplReplace, trimSpaces } from '../../utils/tools';

class Carousel {
  constructor (el, data) {
    this.name = 'carousel';
    this.$el = el;
    this.data = data;
    this.dataLen = this.data.length;
    this.curIdx = 0;

  }

  async init () {
    await this.render();
    this.autoplay();
    this.bindEvent();
  }

  async render () {
    await this.$el.append(tplReplace(tpl, {
      list: this.renderList(),
      control: controlTpl(),
      indicator: this.renderIndicator(),
      indicatorWidth: 18 * this.dataLen
    }));

    this.$carousel = $('.J_carousel');
    this.$carItems = this.$carousel.find('.car-item');
    this.$indicators = this.$carousel.find('.indicator-item');
  }

  bindEvent () {
    this.$carousel.on('click', $.proxy(this.carouselClick, this));
    this.$carousel.on('mouseenter', $.proxy(this.inMouseOut, this));
    this.$carousel.on('mouseleave', $.proxy(this.inMouseOut, this));
  }

  // 自动轮播函数
  autoplay () {
    Carousel.timer = setInterval($.proxy(this.run.bind(this, 'next'), this), 3000);
  }

  // 确定轮播图轮播方向
  run (direction) {
    switch (direction) {
      case 'prev':
        if (this.curIdx <= 0) {
          this.curIdx = this.dataLen - 1;
        } else {
          this.curIdx --;
        }
        break;
      case 'next':
        if (this.curIdx >= this.dataLen - 1) {
          this.curIdx = 0;
        } else {
          this.curIdx ++;
        }
        break;
      default:
        break;
    }

    this.fadeAction(this.curIdx);
  }

  // 轮播图根据下标显示相应的图片
  fadeAction (index) {
    this.$carItems.eq(index).fadeIn()
                  .siblings().fadeOut();

    this.$indicators.eq(index).addClass('current')
                   .siblings().removeClass('current');
  }

  renderList () {
    let list = '';

    this.data.map((item, idx) => {
      list += tplReplace(itemTpl, {
        id: item.phone_id,
        pic: item.pic,
        alt: item.alt,
        isActive: idx === 0 ? 'active' : ''
      });
    });

    return list;
  }

  renderIndicator () {
    let list = '';

    for (let i = 0; i < this.dataLen; i++) {
      list += tplReplace(indicatorTpl, {
        isCurrent: i === 0 ? 'current' : ''
      });
    }

    return list;
  }

  // 控制鼠标进入离开轮播图区域时停止自动轮播与开启自动轮播
  inMouseOut (e) {
    const eventType = e.type; // 获取事件类型

    switch (eventType) {
      case 'mouseenter':
        clearInterval(Carousel.timer);
        break;
      case 'mouseleave':
        this.autoplay();
        break;
      default:
        break;
    }
  }

  carouselClick (e) {
    const tar = e.target,
          className = trimSpaces(tar.className),
          $tar = $(tar);
    
    console.log(1)
    switch (className) {
      case 'indicator-item':
        this.curIdx = $tar.index();
        this.fadeAction(this.curIdx);
        break;
      case 'car-control':
        const direction = $tar.attr('data-dir');
        this.run(direction);
        break;
      default:
        break;
    }
  }
}

export { Carousel }