import './index.scss';
import tpl from './index.tpl';

import { CartItem } from './cart_item';
import { CartBar } from './cart_bar';
import { NoDataTip } from '../no_data_tip';

import { CartModel } from '../../models/cart';
import { DetailModel } from '../../models/detail';
import { tplReplace } from '../../utils/tools';

class CartBoard {
  constructor (el) {
    this.name = 'cartBoard';
    this.$el = el;
    this.cartModel = new CartModel();
    this.detailModel = new DetailModel();
    this.cartData = this.cartModel.getCartDatas();
    this.totalPrice = 0;

    this.selectedItems = []; // 存储已勾选的商品goodsId
  }

  init () {
    this.initTotalPrice();
    this.initSelectedItems();
    this.render();
    this.bindEvent();
  }

  // 初始化总价
  initTotalPrice () {
    if (this.cartData && this.cartData.length > 0) {
      this.cartData.map (item => {
        this.totalPrice += Number(item.price);
      });
    }
  }

  // 初始化存储已勾选商品goodsId集合
  initSelectedItems () {
    if (this.cartData && this.cartData.length > 0) {
      this.selectedItems.push(this.cartData.map(item => {
        return item.goodsId;
      }));
    }
  }

  render () {
    let html = '';
    if (this.cartData && this.cartData.length) {
      const cartItem = new CartItem(),
          cartBar = new CartBar();

      let cartList = '';

      this.cartData.map(item => {
        cartList += cartItem.tpl(item);
      })

      html = tplReplace(tpl, {
        cartList,
        cartBar: cartBar.tpl(this.totalPrice)
      });
    } else {
      html = new NoDataTip().tpl('购物车空空如也');
    }

    this.$el.append(html);
  }

  bindEvent () {
    const $cartBoard = this.$el.find('.J_cartBoard');

    this.$totalPrice = $cartBoard.find('.J_totalPrice');

    $cartBoard.on('click', $.proxy(this.onCartBoardClick, this));
  }

  onCartBoardClick (event) {
    const e = event || window.event,
          tar = e.target || e.srcElement,
          className = tar.className,
          $tar = $(tar);

    let goodsId = '';

    if (className === 'checkbox' || className === 'purchase-btn' || className === 'remove-btn') {
      goodsId = $tar.attr('data-goodsId');
    }

    switch (className) {
      case 'checkbox':
        const price = Number(this.cartData.filter(item => {
          return item.goodsId === goodsId;
        })[0].price);

        this.selectItem(goodsId, price, tar.checked);
        break;
      case 'purchase-btn':
        this.purchaseItem(goodsId);
        break;
      case 'remove-btn':
        this.removeItem(goodsId);
        break;
      case 'total-purchase-btn':
        this.purchaseTotal();
        break;
      default:
        break;
    }
  }

  selectItem (goodsId, price, checked) {
    if (checked) {
      this.totalPrice += price;
      this.selectedItems.push(goodsId);
    } else {
      this.totalPrice -= price;

      this.selectedItems.filter(item => {
        item !== goodsId
      });
    }

    this.$totalPrice.html(this.totalPrice); // 修改视图中的总额
  }

  purchaseItem (goodsId) {
    // 根据goodsId从cartData中筛选出商品信息
    const userPhoneInfo = this.cartData.filter(item => {
      return item.goodsId === goodsId;
    });

    delete userPhoneInfo.goodsId;

    this.detailModel.purchase(userPhoneInfo, true, () => {
      window.location.href = 'order.html';
    });
  }

  removeItem (goodsId) {
    this.cartModel.removeItem(goodsId);

    // 从存储商品goodsId集合中删除该商品goodsId
    this.selectedItems.filter(elem => {
      this.cartData.map(item => {
        return item.goodsId !== elem;
      });
    });

    window.location.reload(); // 刷新页面
  }

  purchaseTotal () {
    let userPhoneInfos = [];

    // 将购物车中的商品信息存入数组
    this.cartData.map(item => {
      userPhoneInfos.push(item);
    });

    userPhoneInfos.map(item => {
      this.detailModel.purchase(item, false);
    });

    window.location.href = 'order.html';
  }
}

export { CartBoard }