import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaUserTag,
  FaBox,
  FaMapMarkerAlt,
  FaClipboardList,
  FaTag,
  FaRupeeSign,
  FaBoxes,
  FaAlignLeft,
  FaImage,
  FaPlus,
} from "react-icons/fa";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: "",
    image: "",
  });

  const dummyUsers = [
    { id: 1, name: "Alice", email: "alice@example.com", role: "Buyer" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "Buyer" },
    { id: 3, name: "Charlie", email: "charlie@example.com", role: "Buyer" },
  ];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/orders`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Orders with Products: ", data);
        setOrders(data);
      })
      .catch((err) => console.error("Error fetching orders:", err));

    fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const updateOrderStatus = (id, status) => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((updatedOrder) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === updatedOrder._id ? updatedOrder : order
          )
        );
      })
      .catch((err) => console.error("Error updating order status:", err));
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newProduct,
        rating: { rate: 2, count: 0 },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts((prev) => [...prev, data]);
        setNewProduct({
          name: "",
          price: "",
          stock: "",
          description: "",
          category: "",
          image: "",
        });
      })
      .catch((err) => console.error("Error adding product:", err));
  };

  return (
    <div className="admin-dashboard">
      <h2><FaClipboardList /> Admin Dashboard</h2>

      <section className="user-management">
        <h3><FaUser /> User Details</h3>
        {dummyUsers.map((user) => (
          <div key={user.id} className="user-card">
            <p><FaUser /> <strong>Name:</strong> {user.name}</p>
            <p><FaEnvelope /> <strong>Email:</strong> {user.email}</p>
            <p><FaUserTag /> <strong>Role:</strong> {user.role}</p>
          </div>
        ))}
      </section>

      <section className="order-management">
        <h3><FaClipboardList /> Order Management</h3>
        {orders.length === 0 ? (
          <p>No orders available</p>
        ) : (
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Buyer Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Product</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderId}</td>
                  <td>{order.name}</td>
                  <td>{order.address}</td>
                  <td>{order.phone}</td>
                  <td>{order.productId?.name || "N/A"}</td>
                  <td>{order.productId?.price ? `₹${order.productId.price}` : "N/A"}</td>
                  <td>{order.status}</td>
                  <td>
                    <select
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      value={order.status}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="inventory-management">
        <h3><FaBoxes /> Inventory Management</h3>

        <form className="product-form" onSubmit={handleProductSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            required
          />
          <button type="submit"><FaPlus /> Add Product</button>
        </form>

        {products.map((product) => (
          <div key={product._id} className="product-card">
            <p><FaTag /> <strong>Name:</strong> {product.name}</p>
            <p><FaRupeeSign /> <strong>Price:</strong> ₹{product.price}</p>
            <p><FaBoxes /> <strong>Stock:</strong> {product.stock}</p>
            <p><FaAlignLeft /> <strong>Description:</strong> {product.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdminDashboard;
