import React, { useState } from "react";
import Header from "components/common/Header";
import InputField from "components/common/InputField";
import { Button, Container } from "@mui/material";
import { buttonStyle } from "components/common/navigation-btn/NavigationBtnStyles";
import { useNavigate } from "react-router-dom";
import { deleteMember } from "api/api";
import { USER_QUIT } from "constants/headerProps";

const isValidEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return emailRegex.test(email);
};

export default function Withdrawal() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (value) => {
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
      const lastChance = window.confirm(
        `회원탈퇴 후 같은 소셜 계정으로 재 가입이 불가능합니다. \n 그래도 탈퇴하시겠습니까?`
      );
      if (lastChance) {
        const res = await deleteMember();
        console.log(`${res || null}회원탈퇴합니다`);

        localStorage.setItem("isLoggedInState", false);
        alert('회원탈퇴가 정상적으로 진행되었습니다.')
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
      <Header title={USER_QUIT.title} url={USER_QUIT.url} />

      <InputField
        label={"이메일"}
        name={"email"}
        type={"email"}
        placeholder={"가입한 소셜 계정의 이메일을 입력해주세요"}
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
          ...(emailError !== "" || email === "" ? {} : buttonStyle.ActiveButton),
        }}
      >
        탈퇴
      </Button>
    </Container>
  );
}
