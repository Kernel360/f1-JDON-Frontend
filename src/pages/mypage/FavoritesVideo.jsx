import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import BottomNav from "../../components/common/BottomNav";
import VideoCard from "../../components/common/card/VideoCard";
import { getFavoritVideo } from "../../api/api";
import Header from "../../components/common/Header";
import Pagenation from "../../components/common/Pagenation";

export default function FavoritesVideo() {
  const [datas, setDatas] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFavoritVideo();
        setDatas(res.data.content);
        setPage(res.data.pageInfo);
        // console.log("찜 확인11", res);
        // console.log("datas", datas);
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
          <Box mt={9} sx={{ width: "100%" }}>
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{
                textAlign: "center",
                fontSize: 16,
                mt: 3,
              }}
            >
              찜한 영상이 없습니다!
            </Typography>
          </Box>
        )}
      </Grid>
      {datas && (
        <Box mt={4}>
          <Pagenation
            pageCount={page?.totalPages}
            currentPage={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      )}
      <BottomNav></BottomNav>
    </Container>
  );
}
