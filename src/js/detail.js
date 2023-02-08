import { App } from './app';
import { Header } from '../components/header';
import { DetailBoard } from '../components/detail_board';
import { Footer } from '../components/footer';

import { getUrlQueryValue } from '../utils/tools';

class Detail extends App {
  constructor ($) {
    super($, {
      swiper: false,
      phone: true,
      field: true
    });

    this.phoneId = getUrlQueryValue('id');
  }

  render () {
    new Header(this.$app, this.cache.fieldData, this.cache.phoneData).init();
    new DetailBoard(this.$app, this.getPhoneData(this.phoneId)).init();
    new Footer(this.$app).init();

    $('body').prepend(this.$app);
  }

  // 根据手机id获取相应手机信息
  getPhoneData (id) {
    let data = null;

    this.cache.phoneData.filter(item => {
      if (item.id === id) {
        data = item;
      }
    });

    return data;
  }
}

new Detail(jQuery);