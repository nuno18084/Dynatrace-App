import React, { useState } from "react";
import "./Navbar.css";
import Logo from "./assets/BNP_Logo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img src={Logo} alt="BNP Paribas Logo" className="logo-img" />
        </div>

        {/* Menu Links */}
        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <a href="/" className="navbar-link">
            Home
          </a>
          <a href="/about" className="navbar-link">
            About
          </a>
          <a href="/services" className="navbar-link">
            Services
          </a>
          <a href="/contact" className="navbar-link">
            Contact
          </a>
        </div>

        {/* Hamburger Menu Icon */}
        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
