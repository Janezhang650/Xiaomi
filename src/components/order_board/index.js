import './index.scss';
import tpl from './index.tpl';

import { OrderItem } from './order_item';
import { NoDataTip } from '../no_data_tip';

import { OrderModel } from '../../models/order';

import { tplReplace } from '../../utils/tools';

class OrderBoard {
  constructor (el) {
    this.name = 'orderBoard';
    this.$el = el;
    this.orderModel = new OrderModel();
    this.purchaseData = this.orderModel.getPurchaseDatas();
  }

  init () {
    this.render();
  }

  render () {
    let html = '';

    if (this.purchaseData && this.purchaseData.length > 0) {
      const orderItem = new OrderItem();

      let orderList = '';

      this.purchaseData.map(item => {
        orderList += orderItem.tpl(item);
      });

      html = tplReplace(tpl, { orderList });
    } else {
      html = new NoDataTip().tpl('您还没有订单')
    }

    this.$el.append(html);
  }
}

export { OrderBoard }