import React from "react";
import { Link } from "react-router-dom";
import veg from "../assets/vegi.png"
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={veg}  className="veg"/>
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/placeorder/:id">Place Order</Link></li>
        <li><Link to="/trackorder">Track Order</Link></li>
        <li><Link to="/admin">Admin Dashboard</Link></li>
    
      </ul>
    </nav>
  );
};

export default Navbar;
