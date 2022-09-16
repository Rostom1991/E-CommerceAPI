const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: Number },
    products: [
      {
        productId: { type: String },
        title: { type: String },
        qty: { type: Number },
      },
    ],
    amount: { type: Number, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
