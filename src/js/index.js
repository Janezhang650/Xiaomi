import { App } from './app';
import { Header } from '../components/header';
import { Carousel } from '../components/carousel';

class Index extends App{
  constructor ($) {
    super($, {
      swiper: true,
      phone: true,
      field: true
    });
  }

  render () {
    new Header(this.$app, this.cache.fieldData, this.cache.phoneData).init();
    new Carousel(this.$app, this.cache.swiperData).init();

    $('body').prepend(this.$app);
  }

}

new Index(jQuery);