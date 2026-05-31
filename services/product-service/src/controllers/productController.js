const { v4: uuidv4 } = require("uuid");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../models/productModel");

async function addProduct(req, res) {
  try {

    const {
      name,
      description,
      price,
      stock,
      category
    } = req.body;

    const product = await createProduct(
      uuidv4(),
      name,
      description,
      price,
      stock,
      category
    );

    res.status(201).json(product);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });

  }
}

async function getProducts(req, res) {

  try {

    const page =
      parseInt(req.query.page) || 1;

    const limit =
      parseInt(req.query.limit) || 10;

    const search =
      req.query.search || "";

    const category =
      req.query.category || "";

    console.log("PAGE:", page);
    console.log("LIMIT:", limit);

    const products =
      await getAllProducts(
        page,
        limit,
        search,
        category
      );

    res.json(products);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });

  }
}

async function getProduct(req, res) {

  const product = await getProductById(
    req.params.id
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);

}


async function editProduct(req, res) {

  try {

    const {
      name,
      description,
      price,
      stock,
      category
    } = req.body;

    const product = await updateProduct(
      req.params.id,
      name,
      description,
      price,
      stock,
      category
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });

  }
}

async function removeProduct(req, res) {

  try {

    const product = await deleteProduct(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });

  }
}

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  editProduct,
  removeProduct
};