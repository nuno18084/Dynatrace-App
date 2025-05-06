import React, { useState } from "react";
import "./Navbar.css";
import Logo from "./assets/BNP_Logo.png";
import {
  FiHome,
  FiInfo,
  FiSettings,
  FiMail,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

function Navbar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <img src={Logo} alt="BNP Logo" className="logo-img" />
        <button className="collapse-btn" onClick={toggleSidebar}>
          {collapsed ? <FiChevronsRight /> : <FiChevronsLeft />}
        </button>
      </div>
      <nav className="sidebar-menu">
        <a href="/" className="sidebar-link">
          <FiHome className="icon" />
          <span className="link-text">Home</span>
        </a>
        <a href="/about" className="sidebar-link">
          <FiInfo className="icon" />
          <span className="link-text">About</span>
        </a>
        <a href="/services" className="sidebar-link">
          <FiSettings className="icon" />
          <span className="link-text">Services</span>
        </a>
        <a href="/contact" className="sidebar-link">
          <FiMail className="icon" />
          <span className="link-text">Contact</span>
        </a>
      </nav>
    </div>
  );
}

export default Navbar;
