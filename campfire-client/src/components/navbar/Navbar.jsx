import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">CAMPFIRE</Link>
      </div>
      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/room">Room</Link>

      </div>
    </nav>
  );
}
