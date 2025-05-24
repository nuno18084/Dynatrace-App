import React, { useState } from "react";
import "./TopNav.css";
import { FiUser, FiGlobe, FiSun, FiMoon } from "react-icons/fi";

function TopNav() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle("light-theme");
  };

  return (
    <div className="topnav">
      <button className="nav-button">
        <FiGlobe className="icon" />
        <span>Language</span>
      </button>
      <button className="nav-button theme-toggle" onClick={toggleTheme}>
        {isDarkTheme ? <FiSun className="icon" /> : <FiMoon className="icon" />}
        <span>{isDarkTheme ? "Light Mode" : "Dark Mode"}</span>
      </button>
      <button className="nav-button">
        <FiUser className="icon" />
        <span>Account</span>
      </button>
    </div>
  );
}

export default TopNav;
