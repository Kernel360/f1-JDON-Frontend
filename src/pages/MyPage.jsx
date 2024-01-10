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

import profile from "../assets/profile.svg";
import ToggleList from "../components/ToggleList";
import BottomNav from "../components/common/BottomNav";
import edit from "../assets/images/icn_edit.svg";
// import BottomNav from "../components/common/BottomNav";
import { Link } from "react-router-dom";

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
            width: "45px",
            height: "45px",
            border: "1px solid #FEC93A",
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
        <Link to="/mypage/infoedit">
          <IconButton
            aria-label="정보수정"
            color="black"
            style={{
              backgroundImage: `url(${edit})`,
              backgroundSize: "cover",
              margin: "11px",
              width: "17px",
              height: "17px",
            }}
          >
            {/* <ModeEditIcon />*/}
            {/* <img src="{edit}" /> */}
          </IconButton>
        </Link>
      </Grid>
    </Grid>
  </Grid>
);

const ButtonSection = () => (
  <Grid container spacing={1}>
    <Grid item xs={6}>
      <Button
        sx={{ fontSize: "17px", paddingY: "12px" }}
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
        sx={{ fontSize: "17px", paddingY: "12px" }}
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
      maxWidth="sm"
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
