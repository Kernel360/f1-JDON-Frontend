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
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import profile from "../assets/profile.svg";
import ToggleList from "../components/ToggleList";
import BottomNav from "../components/common/BottomNav";

const ProfileSection = () => (
  <Grid
    container
    spacing={2}
    alignItems="center"
    justifyContent="center"
    marginBottom={5}
  >
    <Grid
      item
      xs={12}
      sm={10}
      container
      direction="column"
      spacing={2}
      alignItems="center"
    >
      <Grid item>
        <Avatar
          alt="user profile"
          src={profile}
          sx={{
            background: "inherit",
            width: "2.8125rem",
            height: "2.8125rem",
            border: "1px solid #000",
          }}
        />
      </Grid>
      <Grid item container alignItems="center" justifyContent="center">
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            marginLeft: "1.375rem",
            fontWeight: "600",
          }}
        >
          지렁이
        </Typography>
        <IconButton aria-label="정보수정" color="primary">
          <ModeEditIcon />
        </IconButton>
      </Grid>
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
        disableElevation
      >
        찜
      </Button>
    </Grid>
    <Grid item xs={6}>
      <Button
        sx={{ fontSize: "1.0625rem" }}
        variant="contained"
        color="primary"
        fullWidth
        disableElevation
      >
        커피챗
      </Button>
    </Grid>
  </Grid>
);

export default function MyPage() {
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
      <BottomNav></BottomNav>
    </Container>
  );
}
