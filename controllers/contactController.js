const contactModel = require("../models/contactModel");

const createContact = async (req, res) => {
  const { fullName, email, message } = req.body;
  try {
    const contact = await contactModel.create({ fullName, email, message });

    res.status(200).json(contact);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = { createContact };
