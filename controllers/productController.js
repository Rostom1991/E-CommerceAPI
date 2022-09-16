const productModel = require("../models/productModel");
const mongoose = require("mongoose");

// ADD PRODUCT
const addProduct = async (req, res) => {
  const { title, desc, img, category, color, price } = req.body;
  try {
    const product = await productModel.create({
      title,
      desc,
      img,
      category,
      color,
      price,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await productModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get One Product
const getOneProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID Not Valid" });
  }

  const product = await productModel.findById(id);
  if (!product) {
    return res.status(400).json({ error: "No Such Product" });
  }

  res.status(200).json(product);
};

//Delete a Product

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID Not Valid" });
  }
  const product = await productModel.findOneAndDelete({ _id: id });
  if (!product) {
    return res.status(400).json({ error: "No Such Product" });
  }
  res.status(200).json(product);
};

//Update a Product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID Not Valid" });
  }
  const product = await productModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!product) {
    return res.status(400).json({ error: "No Such Product" });
  }
  res.status(200).json(product);
};

module.exports = {
  addProduct,
  getProducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
};
