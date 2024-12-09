module.exports = {
  carts: {}, // { userId: [ { itemId, quantity, price } ] }
  orders: [], // { userId, orderId, items, total, discount, couponCode }
  coupons: {}, //  { couponCode: { isValid, discountPercent, isUsed } }
  usedCoupons: new Set(),
  nthOrderThreshold: 5,
};
