import React, { useState } from "react";
import "./TopNav.css";
import { FiUser, FiGlobe, FiSun, FiMoon } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function TopNav() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle("light-theme");
  };

  return (
    <div className="topnav">
      <div>
        <button
          className="nav-button"
          title="Change Language"
          aria-label="Change Language"
        >
          <FiGlobe className="icon" />
          <span className="tooltip">Language</span>
        </button>
        <button
          className="nav-button theme-toggle"
          onClick={toggleTheme}
          title={isDarkTheme ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label={
            isDarkTheme ? "Switch to Light Mode" : "Switch to Dark Mode"
          }
        >
          {isDarkTheme ? (
            <FiSun className="icon" />
          ) : (
            <FiMoon className="icon" />
          )}
          <span className="tooltip">
            {isDarkTheme ? "Light Mode" : "Dark Mode"}
          </span>
        </button>
        <button
          className="nav-button"
          title="Account Settings"
          aria-label="Account Settings"
          onClick={() => navigate("/account")}
        >
          <FiUser className="icon" />
          <span className="tooltip">Account</span>
        </button>
      </div>
    </div>
  );
}

export default TopNav;
