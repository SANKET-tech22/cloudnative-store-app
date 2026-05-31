require("dotenv").config();

const express = require("express");

const productRoutes = require("./routes/productRoutes")

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

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