import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { SignInStyle } from "../PageStyles";
import TitleLogo from "./TitleLogo";
import kakao from "assets/images/kakao.svg";
import git from "assets/images/github.svg";
import { LoginBtn } from "./LoginBtn";

export default function SignIn() {
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box sx={SignInStyle.ElemContainer}>
        <Box textAlign="center" width="100%">
          <TitleLogo />
          <Box sx={SignInStyle.BtnContainer}>
            <LoginBtn
              title="카카오톡으로 시작하기"
              color="#191919"
              social="kakao"
              logo={kakao}
            />
            <LoginBtn
              title="깃허브로 시작하기"
              color="white"
              social="github"
              logo={git}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
