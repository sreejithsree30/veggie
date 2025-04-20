const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require('./routes/adminRoutes'); 

const Order = require("./models/Order");
const Product = require("./models/Product");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/veggieapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/admin', adminRoutes);


app.post('/api/orders', async (req, res) => {
  try {
    const { productId, name, address, phone} = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const order = new Order({
      orderId: `ORD${Math.floor(Math.random() * 1000000)}`,
      productId: product._id,
      productName: product.name,
      name,
      address,
      phone,
      status: "Pending",
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error placing the order" });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("productId"); 
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/api/orders/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
