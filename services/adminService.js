const store = require("../data/store");

exports.createCoupon = () => {
  const orderCount = store.orders.length;
  if (orderCount > 0 && orderCount % store.nthOrderThreshold === 0) {
    const newCouponCode = `COUPON-${orderCount}`;
    store.coupons[newCouponCode] = { isValid: true, discountPercent: 10 };
    return { couponCode: newCouponCode, discountPercent: 10 };
  } else {
    throw new Error("Coupon generation condition not met");
  }
};

exports.fetchStats = () => {
  const totalPurchaseAmount = store.orders.reduce((sum, order) => sum + order.total, 0);
  const totalDiscountAmount = store.orders.reduce((sum, order) => sum + order.discount, 0);

  const couponCodesUsed = [...new Set(store.orders.map((order) => order.couponCode).filter(Boolean))];
  const totalItemsPurchased = store.orders.reduce(
    (count, order) => count + order.items.reduce((sum, item) => sum + item.quantity, 0),
    0
  );

  return {
    totalItemsPurchased,
    totalPurchaseAmount,
    couponCodesUsed,
    totalDiscountAmount,
  };
};
