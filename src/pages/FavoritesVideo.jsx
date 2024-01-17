import React from "react";
import {
  Container,
  Box,
  Avatar,
  Button,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";

import BottomNav from "../components/common/BottomNav";

// import BottomNav from "../components/common/BottomNav";
import { Link } from "react-router-dom";

export default function FavoritesVideo() {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "95vh",
        minwidth: "100vw",
        pb: 10,
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        fontSize="1rem"
        textAlign="center"
        padding={2}
        marginBottom={10}
      >
        찜
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Button
        position="sticky"
        bottom="0"
        variant="secondary"
        size="large"
        sx={{ width: "100%", backgroundColor: "#EBEBEB", fontSize: "1.05rem" }}
      >
        로그아웃
      </Button>
      <BottomNav></BottomNav>
    </Container>
  );
}
