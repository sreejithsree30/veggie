import React, { useState } from "react";
import "./TrackOrder.css";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);

 const handleTrack = () => {
 fetch(`${import.meta.env.VITE_BASE_URL}/api/orders/${orderId}`)
 .then((res) => res.json())
.then((data) => setOrder(data))
 .catch((err) => console.error("Track error:", err));
 };

 return (
<div className="track-order-container">
<div className="track-box">
 <h2>Track Your Order</h2>
 <div className="track-input-group">
 <input
 placeholder="Enter Order ID"
 value={orderId}
 onChange={(e) => setOrderId(e.target.value)}
 />
 <button onClick={handleTrack}>Track</button>
 </div>

{order && (
 <div className="order-details">
 <h3>Order Details</h3>
 <p><strong>Status:</strong> {order.status}</p>
 <p><strong>Product ID:</strong> {order.productId}</p>
 <p><strong>Shipping Address:</strong> 123 Green Lane, Agro City</p>
<p><strong>Expected Delivery:</strong> 3-5 working days</p>

 <div className="map-container">
 <h4>Delivery Location</h4>
 <div className="map-placeholder">
<p>🗺️ Map View Coming Soon</p>
 </div>
 </div>
 </div>
 )}
 </div>
 </div>
 );
};

export default TrackOrder;
