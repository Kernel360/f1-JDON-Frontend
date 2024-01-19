import React, { useState, useEffect } from "react";
import { Container, Box, Button, Typography, Grid } from "@mui/material";

import BottomNav from "../components/common/BottomNav";
import VideoCard from "../components/common/card/VideoCard";
import { getFavoritVideo } from "../api/api";
import Header from "../components/common/Header";

export default function FavoritesVideo() {
  const [datas, setDatas] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFavoritVideo();
        setDatas(res.data);
        console.log("찜 확인", res.data);
        console.log("datas", datas);
      } catch (error) {
        console.error("getFavoritVideo API 에러", error);
      }
    };
    fetchData();
  }, []);

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
      <Header title={"찜"} />
      <Grid container spacing={{ xs: 2, md: 2 }} sx={{ px: 2, py: 1 }}>
        {datas && datas.length > 0 ? (
          datas.map((item, index) => (
            <Grid item xs={12} sm={4} md={4} key={index}>
              <VideoCard data={item} />
            </Grid>
          ))
        ) : (
          <Typography
            variant="body1"
            component="p"
            textAlign="center"
            mt={4}
            mb={4}
          >
            찜한 영상이 없습니다!
          </Typography>
        )}
      </Grid>
      <Box sx={{ flexGrow: 1 }} />
      <Button
        position="sticky"
        bottom="0"
        variant="secondary"
        size="large"
        sx={{ width: "100%", backgroundColor: "#EBEBEB", fontSize: "1.05rem" }}
      >
        페이지네이션 자리
      </Button>
      <BottomNav></BottomNav>
    </Container>
  );
}
