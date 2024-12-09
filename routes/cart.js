const express = require("express");
const { addToCart, checkout } = require("../controllers/cartController");
const validator = require("express-joi-validation").createValidator({});

const { addItemToCartSchema, checkoutSchema } = require("../validators/cartValidator");

const router = express.Router();

router.post("/", validator.body(addItemToCartSchema), addToCart);
router.post("/checkout", validator.body(checkoutSchema), checkout);

module.exports = router;
