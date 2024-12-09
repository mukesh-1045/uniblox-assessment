const { addItemToCart, processCheckout } = require("../services/cartService");

exports.addToCart = (req, res) => {
  const { userId, itemId, quantity, price } = req.body;
  if (!userId || !itemId || quantity <= 0 || price <= 0) {
    return res.status(400).send({ error: "Invalid input parameters" });
  }
  const result = addItemToCart(userId, { itemId, quantity, price });
  res.status(201).send(result);
};

exports.checkout = (req, res) => {
  const { userId, couponCode } = req.body;
  try {
    const result = processCheckout(userId, couponCode);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
