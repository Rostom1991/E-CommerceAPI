const router = require("express").Router();
const {
  createUser,
  getUsers,
  getOneUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

router.post("/", createUser);

router.get("/", getUsers);

router.get("/:id", getOneUser);

router.delete("/:id", deleteUser);

router.patch("/:id", updateUser);

module.exports = router;
