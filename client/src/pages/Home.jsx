
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const handleClick = (id) => {
    navigate(`/placeorder/${id}`);
  };

  return (
    <div className="home-container">
      <h2 className="heading">Product Catalogue</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="card" key={product._id} onClick={() => handleClick(product._id)}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <p>{product.category}</p>
            <p>⭐ {product.rating?.rate} ({product.rating?.count})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
