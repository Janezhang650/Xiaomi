import './index.scss';
import tpl from './index.tpl';

import { CartItem } from './cart_item';
import { CartBar } from './cart_bar';

import { CartModel } from '../../models/cart';
import { tplReplace } from '../../utils/tools';

class CartBoard {
  constructor (el) {
    this.name = 'cartBoard';
    this.$el = el;
    this.cartData = new CartModel().getCartDatas();
    this.totalPrice = 0;
  }

  init () {
    this.initTotalPrice();
    this.render();
  }

  initTotalPrice () {
    this.cartData.map (item => {
      this.totalPrice += Number(item.price);
    });
  }

  render () {
    const cartItem = new CartItem(),
          cartBar = new CartBar();

    let cartList = '';

    this.cartData.map(item => {
      cartList += cartItem.tpl(item);
    })

    this.$el.append(tplReplace(tpl, {
      cartList,
      cartBar: cartBar.tpl(this.totalPrice)
    }));
  }
}

export { CartBoard }