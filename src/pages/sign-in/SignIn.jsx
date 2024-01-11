import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { SignInStyle } from "../PageStyles";
import TitleLogo from "./TitleLogo";
import { KaKaoLoginButton } from "./KakaoLoginBtn";
import { GitHubLoginButton } from "./GithubLoginBtn";

export default function SignIn() {
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box sx={SignInStyle.ElemContainer}>
        <Box textAlign="center" width="100%">
          <TitleLogo />
          <Box sx={SignInStyle.BtnContainer}>
            <KaKaoLoginButton></KaKaoLoginButton>
            <GitHubLoginButton></GitHubLoginButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
