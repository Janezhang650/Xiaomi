import { App } from './app';
import { Header } from '../components/header';
import { OrderBoard } from '../components/order_board';
import { Footer } from '../components/footer';

class Order extends App {
  constructor ($) {
    super($, {
      swiper: false,
      phone: true,
      field: true
    });
  }

  render () {
    new Header(this.$app, this.cache.fieldData, this.cache.phoneData).init();
    new OrderBoard(this.$app).init();
    new Footer(this.$app).init();

    $('body').prepend(this.$app);
  }
}

new Order(jQuery);