import config from '../utils/config';

import { getDateTime, setRandNum } from '../utils/tools';

class DetailModel {
  getPhoneInfo (pid) {
    const url = `getDatas?swiper=false&phone=true&field=false`;

    return new Promise((resolve, reject) => {
      $.ajax({
        url: config.API.base_url + url,
        type: 'get',
        dataType: 'JSONP',
        jsonp: 'cb',
        success (data) {
          let dataObj = null;

          data.phone_data.filter(item => {
            if (item.id === pid) {
              dataObj = item;
            }
          });

          resolve(dataObj);
        }
      });
    });
  }

  addToCart (userPhoneInfo, callback) {
    let cartData = localStorage.getItem('cartData');

    if (!cartData) {
      cartData = [];
    } else {
      cartData = $.parseJSON(cartData);
    }

    const _cartArr = cartData.filter(item => {
      if (item.id === userPhoneInfo.id) {
        if (item.version === userPhoneInfo.version && item.color === userPhoneInfo.color) {
          return true;
        }
      }
    });

    if (_cartArr.length <= 0) {
      let purchaseData = localStorage.getItem('purchaseData');

      if (purchaseData) {
        purchaseData = $.parseJSON(purchaseData);

        const _purchaseArr = purchaseData.filter(item => {
          if (item.id === userPhoneInfo.id) {
            if (item.version === userPhoneInfo.version && item.color === userPhoneInfo.color) {
              return true;
            }
          }
        });

        if (_purchaseArr.length <= 0) {
          addDataToCart();
        } else {
          alert('您已购买过该商品。');
        }
      } else {
        addDataToCart();
      }
    } else {
      alert('该商品已在购物车中。')
    }

    function addDataToCart () {
      userPhoneInfo.goodsId = setRandNum();
      cartData.push(userPhoneInfo);
      localStorage.setItem('cartData', JSON.stringify(cartData));
      alert('您已成功将该商品加入购物车');
      callback && callback();
    }
  }

  purchase (userPhoneInfo, doAlert, callback) {
    let purchaseData = localStorage.getItem('purchaseData');

    if (purchaseData) {
      purchaseData = $.parseJSON(purchaseData);

      const _arr = purchaseData.filter(item => {
        if (item.id === userPhoneInfo.id) {
          if (item.color === userPhoneInfo.color && item.version === userPhoneInfo.version) {
            return true;
          }
        }
      });

      if (_arr.length <= 0) {
        addToPurchaseData(); // 购买商品
        removeInfoFromCart(); // 从购物车删除商品信息
      } else {
        alert('您已购买了该商品。');
      }
    } else {
      purchaseData = [];
      addToPurchaseData(); // 购买商品
      removeInfoFromCart(); // 从购物车删除商品信息
    }

    function addToPurchaseData () {
      userPhoneInfo.purchaseTime = getDateTime();
      userPhoneInfo.orderId = setRandNum();
      purchaseData.push(userPhoneInfo);
      localStorage.setItem('purchaseData', JSON.stringify(purchaseData));
      doAlert && alert('您已成功购买该商品。');
    }

    function removeInfoFromCart () {
      let cartData = localStorage.getItem('cartData');

      if (cartData) {
        cartData = $.parseJSON(cartData);

        cartData = cartData.filter(item => {
          if (item.id === userPhoneInfo.id) {
            if (item.version === userPhoneInfo.version && item.color === userPhoneInfo.color) {
              return false;
            }
          }
          return true;
        });

        localStorage.setItem('cartData', JSON.stringify(cartData));
      }
      
      callback && callback();
    }
  }
}

export { DetailModel }