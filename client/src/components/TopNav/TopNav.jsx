import React, { useState } from "react";
import "./TopNav.css";
import { FiUser, FiGlobe, FiSun, FiMoon } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

function TopNav() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle("light-theme");
  };

  const handleLangSelect = (lang) => {
    i18n.changeLanguage(lang);
    setShowLangMenu(false);
  };

  return (
    <div className="topnav">
      <div>
        <div className="lang-dropdown-wrapper">
          <button
            className="nav-button"
            title={t("Language")}
            aria-label={t("Language")}
            onClick={() => setShowLangMenu((v) => !v)}
          >
            <FiGlobe className="icon" />
            <span className="tooltip">{t("Language")}</span>
          </button>
          {showLangMenu && (
            <div className="lang-menu">
              <button onClick={() => handleLangSelect("en")}>English</button>
              <button onClick={() => handleLangSelect("fr")}>Français</button>
            </div>
          )}
        </div>
        <button
          className="nav-button theme-toggle"
          onClick={toggleTheme}
          title={
            isDarkTheme ? t("Switch to Light Mode") : t("Switch to Dark Mode")
          }
          aria-label={
            isDarkTheme ? t("Switch to Light Mode") : t("Switch to Dark Mode")
          }
        >
          {isDarkTheme ? (
            <FiSun className="icon" />
          ) : (
            <FiMoon className="icon" />
          )}
          <span className="tooltip">
            {isDarkTheme ? t("Light Mode") : t("Dark Mode")}
          </span>
        </button>
        <button
          className="nav-button"
          title={t("Account")}
          aria-label={t("Account")}
          onClick={() => navigate("/account")}
        >
          <FiUser className="icon" />
          <span className="tooltip">{t("Account")}</span>
        </button>
      </div>
    </div>
  );
}

export default TopNav;
