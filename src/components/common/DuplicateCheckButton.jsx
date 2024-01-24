import React from "react";
import { Button, InputAdornment } from "@mui/material";
import { duplicateCheckButtonStyle } from "../../pages/info/InfoStyles";
const DuplicateCheckButton = ({ onClick, text }) => {
  return (
    <InputAdornment position="end" sx={{ background: "transparent" }}>
      <Button
        onClick={onClick} // 부모 컴포넌트에서 전달된 onClick 이벤트 핸들러를 실행
        sx={duplicateCheckButtonStyle}
      >
        {text}
      </Button>
    </InputAdornment>
  );
};

export default DuplicateCheckButton;
