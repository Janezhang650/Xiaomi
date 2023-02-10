import { App } from './app';
import { Header } from '../components/header';
import { CartBoard } from '../components/cart_board';
import { Footer } from '../components/footer';

class Cart extends App {
  constructor ($) {
    super($, {
      swiper: false,
      phone: true,
      field: true
    });
  }

  render () {
    new Header(this.$app, this.cache.fieldData, this.cache.phoneData).init();
    new CartBoard(this.$app).init();
    new Footer(this.$app).init();
    
    $('body').prepend(this.$app);
  }
}

new Cart(jQuery);
