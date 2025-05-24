import React, { useState } from "react";
import "./TopNav.css";
import { FiUser, FiGlobe, FiSun, FiMoon } from "react-icons/fi";

function TopNav() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleAccountClick = () => {
    // Handle account button click
    console.log("Account button clicked");
  };

  const handleLanguageClick = () => {
    // Handle language switch
    console.log("Language switch clicked");
  };

  const handleThemeClick = () => {
    setIsDarkMode(!isDarkMode);
    console.log("Theme switch clicked");
  };

  return (
    <div className="top-nav">
      <div className="top-nav-content">
        <div className="top-nav-buttons">
          <button
            className="nav-button"
            onClick={handleLanguageClick}
            data-tooltip="Change Language"
          >
            <FiGlobe className="nav-icon" />
          </button>
          <button
            className="nav-button"
            onClick={handleThemeClick}
            data-tooltip={
              isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            {isDarkMode ? (
              <FiSun className="nav-icon" />
            ) : (
              <FiMoon className="nav-icon" />
            )}
          </button>
          <button
            className="nav-button"
            onClick={handleAccountClick}
            data-tooltip="Account Settings"
          >
            <FiUser className="nav-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
