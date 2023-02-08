import { App } from './app';
import { Header } from '../components/header';
import { Tab } from '../components/tab';
import { ShowBoard } from '../components/show_board';
import { Footer } from '../components/footer';

import { getUrlQueryValue } from '../utils/tools';

class List extends App {
  constructor ($) {
    super ($, {
      swiper: false,
      phone: true,
      field: true
    });

    this.keyword = getUrlQueryValue('keyword');
  }

  render () {
    const oTab = new Tab(this.$app, this.cache.fieldData, this.cache.phoneData);

    new Header(this.$app, this.cache.fieldData, this.cache.phoneData).init();
    oTab.init();
    new ShowBoard(this.$app, oTab.filterDatas(this.cache.phoneData, 'all')).init();
    new Footer(this.$app).init();

    $('body').prepend(this.$app);
  }
}

new List(jQuery);