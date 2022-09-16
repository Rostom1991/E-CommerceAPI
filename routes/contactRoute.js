const { createContact } = require("../controllers/contactController");

const router = require("express").Router();

router.post("/", createContact);

module.exports = router;
