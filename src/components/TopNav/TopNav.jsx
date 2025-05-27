import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

const TopNav = () => {
  const { t } = useTranslation();

  const handleLangSelect = useCallback((lang) => {
    // Implementation of handleLangSelect function
  }, []);

  return (
    <div>
      {/* Existing JSX code */}
      {showLangMenu && (
        <div className="lang-menu">
          <button onClick={() => handleLangSelect("en")}>{t("English")}</button>
          <button onClick={() => handleLangSelect("fr")}>
            {t("Français")}
          </button>
          <button onClick={() => handleLangSelect("pt")}>
            {t("Português")}
          </button>
        </div>
      )}
    </div>
  );
};

export default TopNav;
