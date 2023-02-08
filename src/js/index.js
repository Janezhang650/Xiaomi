import { App } from './app';
import { Header } from '../components/header';
import { Carousel } from '../components/carousel';
import { BoardTitle } from '../components/board_title';

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
    new BoardTitle(this.$app, '手机上新').init();
    new BoardTitle(this.$app, '超值手机').init();
    new BoardTitle(this.$app, '官方推荐').init();
   

    $('body').prepend(this.$app);
  }

}

new Index(jQuery);