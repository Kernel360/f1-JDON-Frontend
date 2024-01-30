import React, { useState, useEffect } from "react";
import { Container, Box, Button, Typography, Grid } from "@mui/material";

import BottomNav from "../components/common/BottomNav";
import VideoCard from "../components/common/card/VideoCard";
import { getFavoritVideo } from "../api/api";
import Header from "../components/common/Header";
import PaginationComponent from "../components/common/Pagenation";

export default function FavoritesVideo() {
  const [datas, setDatas] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  console.log("datas", datas);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFavoritVideo(currentPage);
        setDatas(res.data);
        console.log("찜 확인", res.data);
        console.log("datas", datas);

        // 최초 렌더링 시에만 전체 데이터의 양을 가져오고 페이지 수를 계산
        // if (currentPage === 1) {
        //   const calculatedTotalPages = Math.ceil(totalCount / 12);
        //   setTotalPages(calculatedTotalPages);
        // }
      } catch (error) {
        console.error("getFavoritVideo API 에러", error);
      }
    };
    // 최초 렌더링 시에만 fetchData 호출
    if (!datas) {
      fetchData();
    }
    // fetchData();
  }, [currentPage, datas]);

  const handlePageChange = (event, value) => {
    // 페이지 변경 시 처리 로직 추가
    console.log(`현재 페이지: ${value}`);
    setCurrentPage(value);
  };

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
      <PaginationComponent
        pageCount={10} // 총 페이지 수 나중에 페이지네이션 api 개발 후 자동화해야함
        currentPage={currentPage}
        onChange={handlePageChange}
      />
      <BottomNav></BottomNav>
    </Container>
  );
}
