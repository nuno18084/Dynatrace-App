import "./Button.css";
import "../../App.css";

const Button = ({ text, color, height, onClick, style }) => {
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
      <span style={{ display: "inline-block" }}>{text}</span>
    </button>
  );
};

export default Button;
