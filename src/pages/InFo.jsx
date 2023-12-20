import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { InFoBasic } from "../components/InfoBasic/InFoBasic";
import { ProgressBar } from "../components/Progressbar";

export default function Info() {
  return (
    <Container component="main" maxWidth="md">
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
  );
}
