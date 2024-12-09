module.exports = {
  carts: {}, // { userId: [ { itemId, quantity, price } ] }
  orders: [], // { userId, orderId, items, total, discount, couponCode }
  coupons: {}, //  { couponCode: { isValid, discountPercent } }
  nthOrderThreshold: 5,
};
