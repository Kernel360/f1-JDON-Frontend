import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../assets/images/logo.svg";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom/dist";

export default function SignIn() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          component="form"
          sx={{
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography
            width="100%"
            sx={{
              fontSize: 16,
              fontWeight: 400,
              color: "#BCBCC4",
              textAlign: "center",
            }}
          >
            {" "}
            당신의 job description을 on 할 시간
          </Typography>
          <img src={logo} alt="" style={{ width: "65%" }} />
          <Divider></Divider>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",

              gap: "25px",
              mt: "150px",
            }}
          >
            <KaKaoLoginButton></KaKaoLoginButton>
            <GitHubLoginButton></GitHubLoginButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

function KaKaoLoginButton() {
  // const CLIENT_ID = "YOUR_CLIENT_ID"; // 여기에 Google Client ID를 넣으세요
  // const REDIRECT_URI = "YOUR_REDIRECT_URI"; // 리디렉션될 URI를 넣으세요
  const navigation = useNavigate();

  const handleLogin = () => {
    // window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    navigation("../info");
  };

  return (
    <div
      onClick={handleLogin}
      style={{
        width: "80%",
        height: "55px",
        background: "#FEE500",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ color: "#191919", fontSize: "16px", fontWeight: "600" }}>
        <span>카카오톡 로그인</span>
      </div>
    </div>
  );
}

function GitHubLoginButton() {
  const navigation = useNavigate();
  // const CLIENT_ID = "YOUR_CLIENT_ID";
  // const REDIRECT_URI = "YOUR_REDIRECT_URI";

  const handleLogin = () => {
    // window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user`;
    navigation("../info");
  };

  return (
    <div
      onClick={handleLogin}
      style={{
        width: "80%",
        height: "55px",
        background: "black",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <span style={{ color: "white", fontSize: "16px", fontWeight: "600" }}>
          깃허브 로그인
        </span>
      </div>
    </div>
  );
}
