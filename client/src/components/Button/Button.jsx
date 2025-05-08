// src/components/DownloadButton/DownloadButton.jsx
import "./Button.css";
import "../../App.css";

const Button = ({ text, color, width, height, onClick }) => {
  return (
    <button
      className="download-btn app"
      onClick={onClick}
      style={{
        backgroundColor: color,
        width: width,
        height: height,
      }}
    >
      {text}
    </button>
  );
};

export default Button;
