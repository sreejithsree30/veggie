import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/hand-drawn-batch-vegetables.png"
import "./About.css";

const About = () => {
 const navigate = useNavigate();

 const handleExplore = () => {
 navigate("/home"); 
 };

return (
 <div className="about-container">
 <div className="about-left">
 <img src={image} alt="About Us"
 className="about-image"
 />
 </div>

 <div className="about-right">
 <p> Veggie is your trusted bulk vegetable and fruit ordering platform. We aim to bridge the gap between farmers and bulk buyers, ensuring fresh produce, transparent prices, and easy ordering from the comfort of your home. </p>
 <p>
 Whether you're a restaurant, grocery store, or large-scale buyer, Veggie helps you streamline your supply with efficiency and trust.
 </p>

 <button className="explore-btn" onClick={handleExplore}>
 Explore Now
 </button>
 </div>
 </div>
 );
};

export default About;
