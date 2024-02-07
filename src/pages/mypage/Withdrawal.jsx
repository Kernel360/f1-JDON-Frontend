import React, { useState } from "react";
import Header from "../../components/common/Header";
import InputField from "../../components/common/InputField";
import { Button, Container } from "@mui/material";
import { buttonStyle } from "../../components/common/navigation-btn/NavigationBtnStyles";
import { useNavigate } from "react-router-dom";
import { deleteMember } from "../../api/api";

// 이메일 유효성 검사 함수
const isValidEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return emailRegex.test(email);
};

export default function Withdrawal() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (value) => {
    // 이메일 유효성 검사
    if (value && !isValidEmail(value)) {
      setEmailError("유효하지 않은 이메일 형식입니다.");
    } else {
      setEmailError("");
    }
    setEmail(value);
    console.log("e1111ee", value);
  };

  const handleSaveChanges = async () => {
    try {
      console.log("최종Email", email);
      const res = await deleteMember();
      if (res) {
        console.log(`${res || null}회원탈퇴합니다`);

        localStorage.setItem("isLoggedInState", "false");
        navigate("/");
      }
    } catch (error) {
      console.error("Withdrawal파일 deleteMember 통신에러", error);
    }
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "85vh",
        justifyContent: "space-between",
        paddingX: "29px",
      }}
    >
      <Header title={"회원 탈퇴"} />

      <InputField
        label={"이메일"}
        name={"email"}
        type={"email"}
        placeholder={"이메일을 입력해주세요"}
        value={email}
        onChange={(name, value) => handleEmailChange(value)}
        error={emailError !== ""}
        helperText={emailError}
        onBlur={() => handleEmailChange(email)}
      />

      <Button
        onClick={handleSaveChanges}
        disabled={emailError !== "" || email === ""}
        fullWidth
        mb={1}
        sx={{
          ...buttonStyle.Button,
          ...(emailError !== "" || email == "" ? {} : buttonStyle.ActiveButton),
        }}
      >
        탈퇴
      </Button>
    </Container>
  );
}
