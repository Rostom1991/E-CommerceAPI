const router = require("express").Router();
const authMiddle = require("../middleware/authMiddle");
const { createOrder } = require("../controllers/orderController");

// router.use(authMiddle);
router.post("/", createOrder);

module.exports = router;
