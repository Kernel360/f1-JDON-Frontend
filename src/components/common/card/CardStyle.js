export const BadgeStyle = (status) => ({
  width: "fit-content",
  background: status === "모집중" ? "#FFF4BE" : "#DADADA",
  borderRadius: "4px",
  padding: "3px 5px",
  fontSize: "10px",
  color: "#323236",
  fontWeight: 600,
});
export const jobStyle = (status) => ({
  width: "fit-content",
  background: "white",
  border: "1px solid #FF814D",
  borderRadius: "4px",
  padding: "3px 5px",
  fontSize: "10px",
  color: "#FF814D",
  fontWeight: 600,
});

export const VideoCardStyle = {
  Title: {
    color: "#545459",
    fontWeight: "400",
    fontSize: "14px",
    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2, // 이 값으로 표시할 줄 수를 설정합니다.
    textOverflow: "ellipsis",
    height: 42, // 이 값은 줄 수와 폰트 크기에 따라 조정될 수 있습니다.
  },
  Instructor: {
    color: "#9A9AA1",
    display: "flex",
    fontSize: "12px",
    justifyContent: "space-between",
  },
  StudentCount: {
    color: "#E66C4D",
    fontSize: "12px",
    display: "flex",
    fontWeight: 600,
    gap: 0.5,
    alignItems: "center",
  },
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
