import { useState, useEffect } from "react";

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof document !== "undefined") {
      return !document.body.classList.contains("light-theme");
    }
    return true;
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(!document.body.classList.contains("light-theme"));
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const chartBgColor = isDarkMode ? "#1c1c1c" : "#fff";
  const cardBgColor = isDarkMode ? "#1c1c1c" : "#fff";
  const fontColor = isDarkMode ? "#fff" : "#23272f";

  return { isDarkMode, cardBgColor, chartBgColor, fontColor };
};

export default useDarkMode;
