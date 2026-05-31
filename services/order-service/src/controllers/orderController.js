const { v4: uuidv4 } = require("uuid");

const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} = require("../models/orderModel");

const {
  getProductById
} = require("../models/productLookup");

async function addOrder(req, res) {

  try {

    const {
      user_id,
      product_id,
      quantity
    } = req.body;

    const product =
      await getProductById(product_id);

    if (!product) {

      return res.status(404).json({
        message: "Product not found"
      });

    }

    const totalPrice =
      Number(product.price) * quantity;

    const order =
      await createOrder(
        uuidv4(),
        user_id,
        product_id,
        quantity,
        totalPrice
      );

    res.status(201).json(order);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });

  }
}

async function getOrders(req, res) {

  const orders =
    await getAllOrders();

  res.json(orders);
}


async function getOrder(req, res) {

  console.log("Order ID:", req.params.id);

  try {

    const order =
      await getOrderById(req.params.id);

    console.log("Order Found:", order);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json(order);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });

  }
}


async function changeOrderStatus(
  req,
  res
) {

  try {

    const { status } = req.body;

    const order =
      await updateOrderStatus(
        req.params.id,
        status
      );

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json(order);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });

  }
}


async function removeOrder(
  req,
  res
) {

  try {

    const order =
      await deleteOrder(
        req.params.id
      );

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json({
      message:
        "Order deleted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });

  }
}

module.exports = {
  addOrder,
  getOrders,
  getOrder,
  changeOrderStatus,
  removeOrder
};