const express = require("express");

const router = express.Router();

const {
  addPayment,
  getPayments,
  removePayment
} = require("../controllers/paymentController");

router.post("/", addPayment);

router.get("/", getPayments);

router.delete("/:id", removePayment);

module.exports = router;