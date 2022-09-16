const router = require("express").Router();

const {
  addProduct,
  getOneProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

router.post("/", addProduct);

router.get("/", getProducts);

router.get("/:id", getOneProduct);

router.delete("/:id", deleteProduct);

router.patch("/:id", updateProduct);

module.exports = router;
