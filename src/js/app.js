import '../scss/common.scss';
import { IndexModel } from '../models/index';

class App {
  constructor ($, options) {
    this.$app = $('<div id="app">');
    this.swiper = options.swiper;
    this.phone = options.phone;
    this.field = options.field;
    this.cache = {}; // 前端数据缓存池

    this.init();
  }

  async init () {
    await this.getDatas();
    this.render();
  }

  async getDatas () {
    const indexModel = new IndexModel();

    await indexModel.getDatas({
      swiper: this.swiper,
      phone: this.phone,
      field: this.field
    }).then(res => {
      this.cache = {
        swiperData: res.swiper_data || null,
        phoneData: res.phone_data || null,
        fieldData: res.field_data || null
      }
    });
  }

  filterDatas (field) {
    return this.cache.phoneData.filter(item => {
      switch (field) {
        case 'recom':
          return item.recom == 1;
          break;
        case 'new':
          return item.new == 1;
          break;
        case 'valuable':
          return item.most_value == 1;
          break;
        default:
          break;
      }
    })
  }
}

export { App }