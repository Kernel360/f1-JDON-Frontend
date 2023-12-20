import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { InFoBasic } from "../components/InfoBasic/InFoBasic";
import { ProgressBar } from "../components/Progressbar";

const theme = createTheme({
  components: {
    MuiPickersStaticWrapper: {
      styleOverrides: {
        root: {
          width: "200px",
          height: "200px",
          borderRadius: "100px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&.id": {
              "& fieldset": {
                borderRadius: "10px", // 기본 테두리 두께
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

export default function Info() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <ProgressBar></ProgressBar>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <InFoBasic></InFoBasic>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
