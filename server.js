const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");


const cartRoutes = require("./routes/cart");
const adminRoutes = require("./routes/admin");



const app = express();

app.use(
  cors({
    origin: "*", // For now added '*' replace it with specific origin for production
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Limit each IP to 100 requests per windowMs 15 min
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: "Too many requests from this IP.",
  },
});
app.use("/api", apiLimiter);
app.use(bodyParser.json());

app.use("/v1/cart", cartRoutes);
app.use("/v1/admin", adminRoutes);


// base server route
app.get("/", (req, res) => {
  res.send("Welcome to the e-commerce API");
});



app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    // Joi error
    res.status(400).json({
      error: "Validation Error",
      details: err.error.details.map((detail) => detail.message),
    });
  } else {
    // Other errors
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
  }
});

// testing
module.exports = app;

// Start server only if this is the main module
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
