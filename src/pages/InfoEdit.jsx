// InfoEdit.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import { Container, Button } from "@mui/material";
import InputField from "../components/common/InputField";
import DuplicateCheckButton from "../components/common/DuplicateCheckButton";

export default function InfoEdit() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isNicknameValid, setNicknameValid] = useState(true);

  // 초반에 정보들 넣어주기
  const handleInputChange = (name, value) => {
    if (name === "nickname") {
      setNickname(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleCheckDuplicate = () => {
    // setNicknameValid(validateField(nickname));
    //통신에서 성공하면 변경해주고아니면 에러 창 띄워주기
  };

  const handleSaveChanges = () => {
    // 여기서 변경된 정보를 저장하는 로직을 추가
    // 저장이 완료되면 프로필 페이지로 이동
    navigate("/profile");
  };

  return (
    <div>
      <Header showBackButton={true} myText={"정보수정"} />

      <Container component="main" sx={{ marginTop: 6, paddingX: "29px" }}>
        <form onSubmit={handleSaveChanges}>
          <InputField
            label="닉네임"
            type="standard"
            id="nickname"
            name="nickname"
            autoComplete="nickname"
            placeholder="사용하실 닉네임을 입력해주세요"
            value={nickname}
            onChange={handleInputChange}
            error={!isNicknameValid}
            helperText={!isNicknameValid ? "닉네임을 입력하세요." : ""}
            inputProps={{
              endAdornment: (
                <DuplicateCheckButton onClick={handleCheckDuplicate} />
              ),
            }}
          />

          <InputField
            label="비밀번호"
            type="standard"
            id="password"
            name="password"
            autoComplete="password"
            placeholder="비밀번호 입력해주세요"
            value={password}
            onChange={handleInputChange}
            error={!isNicknameValid}
            helperText={!isNicknameValid ? "비밀번호를 입력하세요." : ""}
          />

          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleSaveChanges}
            sx={{ boxShadow: "none", marginTop: 3, borderRadius: 5 }}
          >
            수정
          </Button>
        </form>
      </Container>
    </div>
  );
}
