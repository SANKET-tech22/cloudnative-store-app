const { v4: uuidv4 } = require("uuid");

const {
  createPayment,
  getAllPayments,
  findPaymentByOrderId,
  deletePayment
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

    const existingPayment =
      await findPaymentByOrderId(order_id);

    if (existingPayment) {

      return res.status(409).json({
        message:
          "Payment already exists for this order"
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

async function removePayment(req, res) {
  try {
    const payment = await deletePayment(
      req.params.id
    );

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found"
      });
    }

    res.json({
      message: "Payment deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
}

module.exports = {
  addPayment,
  getPayments,
  removePayment
};