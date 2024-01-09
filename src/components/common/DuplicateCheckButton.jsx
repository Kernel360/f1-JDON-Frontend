import React from "react";
import { Button } from "@mui/material";

const DuplicateCheckButton = ({ onClick }) => {
  // 중복 확인 버튼의 스타일을 정의할 수 있습니다.
  const buttonStyle = {
    textTransform: "none",
    marginLeft: "0.5rem",
    height: "1.525rem",
    padding: "0",
    width: "3.125rem",
    fontSize: "0.625rem",
    boxShadow: "none",
    background: "#F2F2F2",
  };

  return (
    <Button
      variant="contained"
      color="grey"
      onClick={onClick} // 부모 컴포넌트에서 전달된 onClick 이벤트 핸들러를 실행
      style={buttonStyle} // 버튼 스타일을 적용
    >
      중복 확인
    </Button>
  );
};

export default DuplicateCheckButton;
