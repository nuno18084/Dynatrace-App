import "./Button.css";
import "../../App.css";
import { useTranslation } from "react-i18next";

const Button = ({ text, color, height, onClick, style, children }) => {
  const { t } = useTranslation();
  return (
    <button
      className="download-btn"
      onClick={onClick}
      style={{
        backgroundColor: color,
        height: height,
        ...style,
      }}
    >
      {children ? (
        children
      ) : (
        <span style={{ display: "inline-block" }}>{t(text)}</span>
      )}
    </button>
  );
};

export default Button;
