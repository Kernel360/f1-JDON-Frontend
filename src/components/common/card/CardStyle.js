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

export const VideoCardStyle = {
  Title: {
    color: "#545459",
    fontWeight: "500",
    fontSize: "14px",
    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2, // 이 값으로 표시할 줄 수를 설정합니다.
    textOverflow: "ellipsis",
    height: 35, // 이 값은 줄 수와 폰트 크기에 따라 조정될 수 있습니다.
  },
  Instructor: {
    color: "#9A9AA1",
    display: "flex",
    fontSize: "12px",
    justifyContent: "space-between",
  },
  StudentCount: { color: "#E66C4D", fontSize: "12px", display: "flex", gap: 1 },
};

export const CompanyCardStyle = {
  Name: {
    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1, // 이 값으로 표시할 줄 수를 설정합니다.
    textOverflow: "ellipsis",
    height: 17, // 이 값은 줄 수와 폰트 크기에 따라 조정될 수 있습니다.
  },
};
