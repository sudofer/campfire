import React from "react";
import {Link} from "react-router-dom"
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <div>CAMPFIRE</div>
      </div>
      <div className="nav-right">
        <Link to="/">
          <div>Home</div>
        </Link>
        <Link to="/about">
          <div>About</div>
        </Link>
      </div>
    </div>
  )
}