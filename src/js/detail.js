import { App } from './app';
import { Header } from '../components/header';
import { DetailBoard } from '../components/detail_board';
import { Footer } from '../components/footer';

import { DetailModel } from '../models/detail';

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

  async render () {
    const data = await this.getPhoneinfo(this.phoneId);
    new Header(this.$app, this.cache.fieldData, this.cache.phoneData).init();
    new DetailBoard(this.$app, data).init();
    new Footer(this.$app).init();

    $('body').prepend(this.$app);
  }

  // 根据手机id获取相应手机信息
  getPhoneinfo (id) {
    const detailModel = new DetailModel();

    return detailModel.getPhoneInfo(id).then(res => {
      return res;
    });
  }
}

new Detail(jQuery);