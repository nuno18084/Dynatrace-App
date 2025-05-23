import "./Button.css";
import "../../App.css";

const Button = ({ text, color, height, onClick }) => {
  return (
    <button
      className="download-btn"
      onClick={onClick}
      style={{
        backgroundColor: color,
        height: height,
      }}
    >
      <span style={{ display: "inline-block" }}>{text}</span>
    </button>
  );
};

export default Button;
