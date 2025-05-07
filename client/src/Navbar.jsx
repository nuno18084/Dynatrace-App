import React, { useState, useEffect } from "react";
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

function Navbar({ headers, selectedColumns, handleColumnSelect }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const body = document.body;
    if (!collapsed) {
      body.classList.add("navbar-open");
    } else {
      body.classList.remove("navbar-open");
    }
  }, [collapsed]);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-scrollable">
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

        <div className={`column-selector ${collapsed ? "hide-columns" : ""}`}>
          <h2 className="column-selector-title">Select Columns:</h2>
          <div className="column-list">
            {headers.map((header) => (
              <label key={header} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(header)}
                  onChange={() => handleColumnSelect(header)}
                />
                {header}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
