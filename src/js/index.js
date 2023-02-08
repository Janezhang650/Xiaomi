import { App } from './app';
import { Header } from '../components/header';
import { Carousel } from '../components/carousel';
import { BoardTitle } from '../components/board_title';
import { ShowBoard } from '../components/show_board';

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
    new ShowBoard(this.$app, this.filterDatas('new')).init();
    new BoardTitle(this.$app, '超值手机').init();
    new ShowBoard(this.$app, this.filterDatas('valuable')).init();
    new BoardTitle(this.$app, '官方推荐').init();
    new ShowBoard(this.$app, this.filterDatas('recom')).init();

    $('body').prepend(this.$app);
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

new Index(jQuery);