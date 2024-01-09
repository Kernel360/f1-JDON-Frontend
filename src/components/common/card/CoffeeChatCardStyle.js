export const BadgeStyle = (status) => ({
  position: "absolute",
  top: "10px",
  right: "10px",
  width: "fit-content",
  background: status === "모집중" ? "#FFEBC3" : "#DADADA",

  borderRadius: "4px",
  padding: "2px 4px",
  fontSize: "12px",
  color: "#323236",
  fontWeight: 500,
});
