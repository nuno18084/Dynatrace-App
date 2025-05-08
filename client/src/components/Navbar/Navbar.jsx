import React, { useEffect } from "react";
import useSidebarCollapse from "../../hooks/useSidebarCollapse";
import useShowAllColumns from "../../hooks/showAllColumns";
import "./Navbar.css";
import Logo from "../../assets/BNP_Logo.png";
import ApplyButton from "../Button/Button";
import {
  FiHome,
  FiInfo,
  FiSettings,
  FiMail,
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

function Navbar({ headers, selectedColumns, handleColumnSelect }) {
  const { collapsed, toggleSidebar } = useSidebarCollapse(true);
  const { showAllColumns, toggleShowColumns } = useShowAllColumns();

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

        <div
          className={`column-selector ${collapsed ? "hide-columns" : ""} ${
            showAllColumns ? "expanded" : ""
          }`}
        >
          <h2 className="column-selector-title">Select Columns:</h2>
          <div className="checkbox-grid">
            {(showAllColumns ? headers : headers.slice(0, 5)).map((header) => (
              <div key={header} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(header)}
                  onChange={() => handleColumnSelect(header)}
                />
                <label>{header}</label>
              </div>
            ))}
          </div>
        </div>

        {headers.length > 5 && !collapsed && (
          <button className="toggle-columns-btn" onClick={toggleShowColumns}>
            {showAllColumns ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        )}
      </div>
      <div
        className={`column-selector ${collapsed ? "hide-columns" : ""} ${
          showAllColumns ? "expanded" : ""
        }`}
      >
        <ApplyButton
          className="apply-btn"
          text="Apply"
          color="#029e7a"
          width="200px"
          height="40px"
          onClick={""}
        />
      </div>
    </div>
  );
}

export default Navbar;
