const express = require("express");
const { generateCoupon, getStats } = require("../controllers/adminController");

const router = express.Router();

router.post("/generate-coupon", generateCoupon);
router.get("/stats", getStats);

module.exports = router;
