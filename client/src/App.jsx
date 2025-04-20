import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Placeorder from "./pages/Placeorder";
import TrackOrder from "./pages/TrackOrder";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./pages/Navbar";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<About />} />
        <Route path="/placeorder/:id" element={<Placeorder />} />
        <Route path="/trackorder" element={<TrackOrder />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
