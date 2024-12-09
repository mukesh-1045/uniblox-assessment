const { createCoupon, fetchStats } = require("../services/adminService");

exports.generateCoupon = (req, res) => {
  try {
    const coupon = createCoupon();
    res.status(201).send({ message: "Coupon generated successfully", coupon });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getStats = (req, res) => {
  try {
    const stats = fetchStats();
    res.status(200).send(stats);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
