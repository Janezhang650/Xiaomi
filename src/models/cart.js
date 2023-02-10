class CartModel {
  getCartDatas () {
    return $.parseJSON(localStorage.getItem('cartData'));
  }

  removeItem (goodsId) {
    let cartData = $.parseJSON(localStorage.getItem('cartData'));

    cartData = cartData.filter(item => {
      return item.goodsId !== goodsId;
    });

    localStorage.setItem('cartData', JSON.stringify(cartData));
  }
}

export { CartModel }