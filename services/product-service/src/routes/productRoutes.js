const express = require("express");

const router = express.Router();

const {
  addProduct,
  getProducts,
  getProduct,
  editProduct,
  removeProduct
} = require("../controllers/productController");

// Health Check Route
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "product-service"
  });
});

// Create Product
router.post("/", addProduct);

// Get All Products
router.get("/", getProducts);

// Get Product By ID
router.get("/:id", getProduct);

// Update Product
router.put("/:id", editProduct);

// Delete Product
router.delete("/:id", removeProduct);

module.exports = router;