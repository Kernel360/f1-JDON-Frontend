import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import login from "../assets/icn_google.svg";
import git from "../assets/icn_github.svg";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Divider } from "@mui/material";

export default function SignIn() {
  const [id, setID] = useState();
  const [pw, setPW] = useState();

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "&.id": {
                "& fieldset": {
                  borderRadius: "10px", // 기본 테두리 두께
                  borderColor: id ? "#6482FF" : "#BCBCC4",
                },
                "&:hover fieldset": {
                  borderColor: "#6482FF",
                },
                "&.Mui-focused fieldset": {
                  borderWidth: "2px",
                  borderColor: "#6482FF", // 포커스 시 색상 변경 안 함
                },
              },
              "&.pw": {
                "& fieldset": {
                  borderRadius: "10px", // 기본 테두리 두께
                  borderColor: pw ? "#6482FF" : "#BCBCC4",
                },
                "&:hover fieldset": {
                  borderColor: "#6482FF",
                },
                "&.Mui-focused fieldset": {
                  borderWidth: "2px",
                  borderColor: "#6482FF", // 포커스 시 색상 변경 안 함
                },
              },
              "& .MuiInputBase-input": {
                color: "#6482FF", // 입력된 값의 색상
                borderColor: "#6482FF",
                "&::placeholder": {
                  color: "#BCBCC4", // 플레이스홀더의 색상
                  opacity: 1, // 브라우저마다 다른 플레이스홀더 투명도 처리를 일관되게 함
                },
              },
            },
          },
        },
      },
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            width="100%"
            sx={{
              fontSize: 30,
              fontWeight: 600,
              marginTop: 8,

              textAlign: "left",
            }}
          >
            로그인
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: "65px",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "20px",
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              placeholder="이메일을 입력해주세요"
              onChange={(e) => setID(e.target.value)}
              InputProps={{
                className: "id", // TextField의 input 요소에 className 적용
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={(e) => setPW(e.target.value)}
              InputProps={{
                className: "pw", // TextField의 input 요소에 className 적용
              }}
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              sx={{
                mt: "50px",
                mb: 2,
                p: "10px",
                borderRadius: "999px",
                background: "#6482FF",
                color: "white",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "black", // 클릭(마우스 오버) 시 배경색 변경
                },
              }}
            >
              로그인
            </Button>
            <Grid container>
              <Grid
                item
                sx={{
                  textAlign: "right",
                  width: "100%",
                }}
              >
                <Divider></Divider>
              </Grid>
              <Grid
                item
                sx={{
                  textAlign: "right",
                  width: "100%",
                  margin: "30px 0",
                }}
              >
                <GoogleLoginButton></GoogleLoginButton>
                <GitHubLoginButton></GitHubLoginButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

function GoogleLoginButton() {
  const CLIENT_ID = "YOUR_CLIENT_ID"; // 여기에 Google Client ID를 넣으세요
  const REDIRECT_URI = "YOUR_REDIRECT_URI"; // 리디렉션될 URI를 넣으세요

  const handleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile%20openid&access_type=offline`;
  };

  return (
    <span onClick={handleLogin}>
      {" "}
      <img src={login} alt="google" />
    </span>
  );
}

function GitHubLoginButton() {
  const CLIENT_ID = "YOUR_CLIENT_ID";
  const REDIRECT_URI = "YOUR_REDIRECT_URI";

  const handleLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user`;
  };

  return (
    <span onClick={handleLogin}>
      <img src={git} alt="git" />
    </span>
  );
}
