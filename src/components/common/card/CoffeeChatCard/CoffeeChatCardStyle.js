export const cardStyles = (data) => ({
  pointer: "cursor",
  my: 1,
  border: "1px solid #B9B9B9",
  borderRadius: "8px",
  height: "220px",
  position: "relative",

  opacity: data.activeStatus === "모집종료" ? 0.4 : 1,
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)",
  },
});
export const headerStyles = {
  container: {
    position: "absolute",
    display: "flex",
    top: "8px",
    left: 10,
    right: 10,
    justifyContent: "space-between",
  },
  viewCount: {
    color: "#B9B9B9",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
};

export const infoItemStyle = {
  pb: "5px",
  color: "#9A9AA1",
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};
export const cardBodyStyle = {
  container: {
    flexDirection: "column",
    gap: "14px",
    padding: "40px 16px",
    height: "100%",
  },
  title: {
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    textOverflow: "ellipsis",
    height: 45,
    fontSize: "16px",
  },
  infoBox: {
    mt: "22px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
};
