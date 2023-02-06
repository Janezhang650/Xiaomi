import './index.scss';
import tpl from './index.tpl';

import { Logo } from './logo';
import { Nav } from './nav';

import { tplReplace } from '../../utils/tools';

class Header {
  constructor (el, fieldData, phoneData) {
    this.name = 'header';
    this.$el = el;
    this.fieldData = fieldData;
    this.phoneData = phoneData;

    this.logo = new Logo();
    this.nav = new Nav();
  }

  async init () {
    await this.render();
    this.bindEvent();
  }

  async render () {
    await this.$el.append(tplReplace(tpl, {
      logo: this.logo.tpl(),
      nav: this.nav.tpl(this.fieldData)
    }));
  }

  bindEvent () {
    const $nav = $('.J_nav');

    $nav.on('mouseenter', '.nav-item',{phoneData: this.phoneData, oNav: this.nav}, this.nav.navMouseIn);
  }
}

export { Header }