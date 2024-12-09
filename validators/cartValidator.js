const Joi = require("joi");

const addItemToCartSchema = Joi.object({
  userId: Joi.string().required().label("User ID"),
  itemId: Joi.string().required().label("Item ID"),
  quantity: Joi.number().integer().min(1).required().label("Quantity"),
  price: Joi.number().positive().required().label("Price"),
});

const checkoutSchema = Joi.object({
  userId: Joi.string().required().label("User ID"),
  couponCode: Joi.string().optional().label("Coupon Code"),
});

module.exports = {
  addItemToCartSchema,
  checkoutSchema,
};
