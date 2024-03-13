const { useState } = require("react");

function RoundButton({ title, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const defaultStyle = {
    border: "none",
    cursor: "pointer",
    borderRadius: "999px",
    fontSize: "12px",
    padding: "4px 10px",
    background: "black",
    color: "white",
    fontWeight: 600,
  };

  const hoverStyle = {
    ...defaultStyle,
    background: "grey",
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={isHovered ? hoverStyle : defaultStyle}
    >
      {title}
    </button>
  );
}

export default RoundButton;
