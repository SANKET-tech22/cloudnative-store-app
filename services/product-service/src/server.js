require("dotenv").config();

const express = require("express");

const productRoutes = require("./routes/productRoutes")

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("PRODUCT REQUEST:", req.method, req.originalUrl);
  next();
});

app.use("/", productRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "product-service",
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});