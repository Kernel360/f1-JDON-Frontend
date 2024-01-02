import React, { useState } from "react";
import {
  Container,
  Box,
  Avatar,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import profile from "../assets/profile.svg";
import ToggleList from "../components/ToggleList";

const ProfileSection = () => (
  <Grid container spacing={2} alignItems="center" marginBottom={5}>
    <Grid item xs={12} sm={11}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar
            alt="user profile"
            src={profile}
            sx={{ background: "lightgrey", width: 43, height: 40 }}
          ></Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h5">지렁이</Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12} sm={1}>
      <Button variant="text">수정</Button>
    </Grid>
  </Grid>
);

const ButtonSection = () => (
  <Grid container spacing={1}>
    <Grid item xs={6}>
      <Button
        sx={{ fontSize: "17px" }}
        variant="contained"
        color="primary"
        fullWidth
      >
        찜
      </Button>
    </Grid>
    <Grid item xs={6}>
      <Button
        sx={{ fontSize: "17px" }}
        variant="contained"
        color="primary"
        fullWidth
      >
        커피챗
      </Button>
    </Grid>
  </Grid>
);

export default function MyPage() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "95vh",
        minwidth: "100vw",
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
        마이페이지
      </Typography>
      <ProfileSection />
      <ButtonSection />
      <ToggleList />
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
    </Container>
  );
}
