class CartModel {
  getCartDatas () {
    return $.parseJSON(localStorage.getItem('cartData'));
  }
}

export { CartModel }