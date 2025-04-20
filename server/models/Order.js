const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: String,
  productId: String,
  productName:String,
  name: String,
  address: String,
  phone: String,
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Order", orderSchema);
