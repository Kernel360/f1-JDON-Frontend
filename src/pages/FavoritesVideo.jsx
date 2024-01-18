import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import VideoCard from "../components/common/card/VideoCard";
import { getFavoritVideo } from "../api/api";

const tempData = [
  {
    lectureId: 1,
    title: "스프링부트 초급편_1",
    lectureUrl: "www.inflearn.com/we234",
    imageUrl:
      "https://cdn.inflearn.com/public/courses/330459/cover/00d1bd8e-3b9d-4c62-b801-fea717c942fa/330459-eng.png",
    instructor: "김영한",
    studentCount: 5332,
    price: 180000,
    isFavorite: true,
  },
  {
    lectureId: 2,
    title: "스프링부트 초급편_2",
    lectureUrl: "www.inflearn.com/we234",
    imageUrl:
      "https://cdn.inflearn.com/public/courses/330459/cover/00d1bd8e-3b9d-4c62-b801-fea717c942fa/330459-eng.png",
    instructor: "김영한",
    studentCount: 5332,
    price: 180000,
    isFavorite: true,
  },
  {
    lectureId: 3,
    title: "스프링부트 초급편_3",
    lectureUrl: "www.inflearn.com/we234",
    imageUrl:
      "https://cdn.inflearn.com/public/courses/330459/cover/00d1bd8e-3b9d-4c62-b801-fea717c942fa/330459-eng.png",
    instructor: "김영한",
    studentCount: 5332,
    price: 180000,
    isFavorite: true,
  },
  {
    lectureId: 4,
    title: "스프링부트 초급편_4",
    lectureUrl: "www.inflearn.com/we234",
    imageUrl:
      "https://cdn.inflearn.com/public/courses/330459/cover/00d1bd8e-3b9d-4c62-b801-fea717c942fa/330459-eng.png",
    instructor: "김영한",
    studentCount: 5332,
    price: 180000,
    isFavorite: true,
  },
  {
    lectureId: 5,
    title: "스프링부트 초급편_5",
    lectureUrl: "www.inflearn.com/we234",
    imageUrl:
      "https://cdn.inflearn.com/public/courses/330459/cover/00d1bd8e-3b9d-4c62-b801-fea717c942fa/330459-eng.png",
    instructor: "김영한",
    studentCount: 5332,
    price: 180000,
    isFavorite: true,
  },
];

export default function FavoritesVideo() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFavoritVideo(1);
        setData(res);
        console.log("찜 확인", res);
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
      {/* {tempData.map((video, index) => (
        <VideoCard key={index} data={video} />
      ))} */}

      <Grid container spacing={{ xs: 2, md: 2 }} sx={{ px: 2, py: 1 }}>
        {tempData.map((item, index) => (
          <Grid item xs={12} sm={4} md={4} key={index}>
            <VideoCard data={item} />
          </Grid>
        ))}
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
