const express = require("express");

const router = express.Router();

const {
  addProduct,
  getProducts,
  getProduct,
  editProduct,
  removeProduct
} = require("../controllers/productController");

router.post("/", addProduct);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.put("/:id", editProduct);

router.delete("/:id", removeProduct)

module.exports = router;