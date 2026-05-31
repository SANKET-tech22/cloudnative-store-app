const express = require("express");

const router = express.Router();

const {
  addPayment,
  getPayments
} = require("../controllers/paymentController");

router.post("/", addPayment);

router.get("/", getPayments);

module.exports = router;