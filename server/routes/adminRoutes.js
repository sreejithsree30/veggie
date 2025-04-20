
const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 

router.post('/products', async (req, res) => {
  try {
    const { name, price, stock, description, category, image } = req.body;
    const newProduct = new Product({
      name,
      price,
      stock,
      description,
      category,
      image,
      rating: { rate: 2, count: 69 }, 
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

module.exports = router;
