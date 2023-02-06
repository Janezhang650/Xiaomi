import './index.scss';
import tpl from './index.tpl';

import { Logo } from './logo';

import { tplReplace } from '../../utils/tools';

class Header {
  constructor (el) {
    this.name = 'header';
    this.$el = el;
    this.logo = new Logo();
  }

  init () {
    this.render()
  }

  render () {
    this.$el.append(tplReplace(tpl, {
      logo: this.logo.tpl()
    }));
  }
}

export { Header }