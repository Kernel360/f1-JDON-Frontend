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
  const [isFavoriteChanged, setIsFavoriteChanged] = useState(true);

  const [page, setPage] = useState({});
  // const [isFavoriteChanged, setIsFavoriteChanged] = useState(false);

  // 추후 스켈레톤 UI 반영 시 지울 내용입니다.
  const [foundTxt, setFoundTxt] = useState("찜한 영상 불러오는 중..");

  useEffect(() => {
    const timer = setTimeout(() => {
      setFoundTxt("찜한 영상이 없습니다.");
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  // --------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFavoritVideo();
        setDatas(res.data.content);
        setPage(res.data.pageInfo);
      } catch (error) {
        console.error("getFavoritVideo API 에러", error);
      }
    };
    // 최초 렌더링 시에만 fetchData 호출
    if (!datas || isFavoriteChanged) {
      fetchData();
      setIsFavoriteChanged(false); // isFavoriteChanged 상태 초기화
    }
    // fetchData();
  }, [currentPage, datas, isFavoriteChanged]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleFavoriteChange = () => {
    // 추가: isFavorite 상태가 변경될 때 호출되는 함수

    setIsFavoriteChanged(true);
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
              <VideoCard
                data={item}
                myFavorite={true}
                onSuccess={handleFavoriteChange}
              />
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
              {foundTxt}
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
      <BottomNav />
    </Container>
  );
}
