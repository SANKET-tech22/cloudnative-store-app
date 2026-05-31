const express = require("express");

const router = express.Router();

const {
  addOrder,
  getOrders,
  getOrder,
  changeOrderStatus,
  removeOrder
} = require("../controllers/orderController");

router.post("/", addOrder);

router.get("/", getOrders);

router.get("/:id", getOrder);

router.put( "/:id/status",
  changeOrderStatus);

router.delete( "/:id", removeOrder)

module.exports = router;