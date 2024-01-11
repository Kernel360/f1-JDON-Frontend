import React from "react";
import { Button, InputAdornment } from "@mui/material";

import { duplicateCheckButtonStyle } from "../../pages/info/InfoStyles";
const DuplicateCheckButton = ({ onClick, text }) => {
  // 중복 확인 버튼의 스타일을 정의할 수 있습니다.
  const buttonStyle = {
    textTransform: "none",
    marginLeft: "0.5rem",
    padding: "7px",
    fontSize: "10px",
    boxShadow: "none",
    background: "#F2F2F2",
    color: "var(gray500)",
  };

  return (
    <InputAdornment position="end" sx={{ background: "transparent" }}>
      <Button
        variant="contained"
        // color="grey"
        onClick={onClick} // 부모 컴포넌트에서 전달된 onClick 이벤트 핸들러를 실행
        sx={duplicateCheckButtonStyle}
      >
        {text}
      </Button>
    </InputAdornment>
  );
};

export default DuplicateCheckButton;
