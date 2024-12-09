const store = require("../data/store");
const { createCoupon } = require("./adminService");

exports.addItemToCart = (userId, item) => {
  if (!store.carts[userId]) {
    store.carts[userId] = [];
  }
  store.carts[userId].push(item);
  return { message: "Item added to cart", cart: store.carts[userId] };
};

exports.processCheckout = (userId, couponCode) => {
  const cart = store.carts[userId];
  if (!cart || cart.length === 0) throw new Error("Cart is empty");

  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;

  if (couponCode) {
    const coupon = store.coupons[couponCode];
    if (!coupon || !coupon.isValid) throw new Error("Invalid coupon code");
    if (coupon.isUsed) {
      console.log("This coupon has already been used");
    } else {
      discount = (coupon.discountPercent / 100) * total;
      total -= discount;
      coupon.isUsed = true;
    }
  }

  const orderId = `ORD-${store.orders.length + 1}`;
  store.orders.push({ userId, orderId, items: cart, total, discount, couponCode });
  delete store.carts[userId];

  // Auto generate coupon after every nth order
  if (store.orders.length > 0 && store.orders.length % 5 === 0) {
    const newCoupon = createCoupon();
    console.log(`Automatic Coupon: ${newCoupon.couponCode}`);
  }

  return { orderId, total, discount };
};