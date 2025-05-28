import "./Button.css";
import "../../App.css";
import { useTranslation } from "react-i18next";
import { FiCheck } from "react-icons/fi";

const Button = ({
  text,
  color,
  height,
  onClick,
  style,
  children,
  loading,
  tick,
}) => {
  const { t } = useTranslation();
  return (
    <button
      className="download-btn"
      onClick={onClick}
      style={{
        backgroundColor: color,
        height: height,
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 140,
        position: "relative",
      }}
      disabled={loading}
    >
      {children ? (
        children
      ) : (
        <span style={{ display: "inline-block" }}>{t(text)}</span>
      )}
      <span
        style={{
          width: 24,
          height: 24,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 8,
        }}
      >
        {loading ? (
          <span
            style={{
              width: 20,
              height: 20,
              border: "3px solid #e0e0e0",
              borderTop: "3px solid #029e7a",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              display: "inline-block",
              boxSizing: "border-box",
              verticalAlign: "middle",
            }}
          />
        ) : tick ? (
          <FiCheck
            style={{
              fontSize: 20,
              color: "white",
              display: "inline-block",
              verticalAlign: "middle",
            }}
          />
        ) : (
          <span
            style={{
              fontSize: 20,
              color: "white",
              display: "inline-block",
              verticalAlign: "middle",
            }}
          >
            &#8594;
          </span>
        )}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </span>
    </button>
  );
};

export default Button;
