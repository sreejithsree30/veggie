

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    quantity: 1,
  });
  const [orderId, setOrderId] = useState("");
  const [productName, setProductName] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setProductName(data.name);
      })
      .catch(console.error);
  }, [id]);

  const handleConfirm = () => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        productId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrderId(data.orderId);
        setConfirmed(true);
      })
      .catch((err) => console.error("Error placing order:", err));
  };

  return (
    <div className="place-order-container">
      {product ? (
        <>
          <div className="order-content">
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            </div>

            <div className="product-details">
              <h2>Place Order for: {product.name}</h2>

              <div className="product-detail">
                <strong>Price:</strong> ₹{product.price}
              </div>
              <div className="product-detail">
                <strong>Description:</strong> {product.description}
              </div>
              <div className="product-detail">
                <strong>Available Quantity:</strong> {product.stock}
              </div>

              <h3>Fill in Your Details:</h3>
              <div className="form-field">
                <label>Name:</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="form-field">
                <label>Address:</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <div className="form-field">
                <label>Phone Number:</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="form-field">
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter quantity"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: Math.max(1, e.target.value),
                    })
                  }
                />
              </div>

              <button className="confirm-order-btn" onClick={handleConfirm}>
                Confirm Order
              </button>
            </div>
          </div>

          {confirmed && (
            <div className="order-confirmation">
              <h3>Order Confirmed!</h3>
              <p>Your Order ID: <strong>{orderId}</strong></p>
              <p>Product Name: <strong>{productName}</strong></p> 
            </div>
          )}
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default PlaceOrder;
