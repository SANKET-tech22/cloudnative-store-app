const { v4: uuidv4 } = require("uuid");

const {
  createPayment,
  getAllPayments
} = require("../models/paymentModel");

const {
  getOrderById
} = require("../models/paymentLookup");

async function addPayment(req, res) {

  try {

    const {
      order_id,
      payment_method
    } = req.body;

    const order =
      await getOrderById(order_id);

    if (!order) {

      return res.status(404).json({
        message: "Order not found"
      });

    }

    const payment =
      await createPayment(
        uuidv4(),
        order_id,
        order.total_price,
        payment_method
      );

    res.status(201).json(payment);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });

  }
}

async function getPayments(req, res) {

  const payments =
    await getAllPayments();

  res.json(payments);
}

module.exports = {
  addPayment,
  getPayments
};