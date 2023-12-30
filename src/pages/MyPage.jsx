import React from "react";
import {
  Container,
  Box,
  Avatar,
  Button,
  Typography,
  Grid,
  ToggleButton,
} from "@mui/material";
import profile from "../assets/profile.svg";
import ToggleList from "../components/ToggleList";

const ProfileSection = () => (
  <Grid container spacing={2} alignItems="center" marginBottom={5}>
    <Grid item xs={12} sm={6}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar
            alt="user profile"
            src={profile}
            sx={{ background: "lightgrey", width: 43, height: 40 }}
          ></Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h6">지렁이</Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Button fullWidth>수정</Button>
    </Grid>
  </Grid>
);

const ButtonSection = () => (
  <Grid container spacing={1}>
    <Grid item xs={6}>
      <Button variant="contained" color="primary" fullWidth>
        찜
      </Button>
    </Grid>
    <Grid item xs={6}>
      <Button variant="contained" color="primary" fullWidth>
        커피챗
      </Button>
    </Grid>
  </Grid>
);

export default function MyPage() {
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h1"
        component="h1"
        fontSize="1.25rem"
        textAlign="center"
        padding={2}
        marginBottom={10}
      >
        마이페이지
      </Typography>
      <ProfileSection />
      <ButtonSection />
      <ToggleList />
      <ToggleButton>토글버튼</ToggleButton>
      <Box
        style={{ position: "fixed", bottom: 0, width: "100%" }}
        marginBottom={5}
      >
        <Button variant="contained" color="grey" fullWidth>
          로그아웃
        </Button>
      </Box>
    </Container>
  );
}
