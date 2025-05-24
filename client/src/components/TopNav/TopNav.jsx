import React from "react";
import "./TopNav.css";
import { FiUser } from "react-icons/fi";

function TopNav() {
  const handleAccountClick = () => {
    // Handle account button click
    console.log("Account button clicked");
  };

  return (
    <div className="top-nav">
      <div className="top-nav-content">
        <div className="account-section">
          <button className="account-button" onClick={handleAccountClick}>
            <FiUser className="account-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
