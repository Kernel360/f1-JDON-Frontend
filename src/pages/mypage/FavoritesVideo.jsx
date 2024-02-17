import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { getFavoritVideo } from "../../api/api";
import Header from "../../components/common/Header";
import VideoCard from "../../components/common/card/VideoCard";
import BottomNav from "../../components/common/BottomNav";
import Pagenation from "../../components/common/Pagenation";

export default function FavoritesVideo() {
  const [datas, setDatas] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState({});
  const [isFavoriteChanged, setIsFavoriteChanged] = useState(true);

  console.log("datas", datas);
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

    if (!datas || isFavoriteChanged) {
      // isFavoriteChanged 상태에 따라 데이터 다시 가져오기
      fetchData();
      setIsFavoriteChanged(false); // isFavoriteChanged 상태 초기화
    }
  }, [currentPage, datas, isFavoriteChanged]);

  const handlePageChange = (event, value) => {
    console.log(`현재 페이지: ${value}`);
    setCurrentPage(value);
  };

  const handleFavoriteChange = () => {
    // 추가: isFavorite 상태가 변경될 때 호출되는 함수
    setIsFavoriteChanged(true);
  };

  return (
    <Box maxWidth="md" paddingX={"16px"} sx={{ width: "100%" }}>
      <Header title={"찜"} />
      <Box mt={2} maxWidth="md" sx={{ padding: 0 }}>
        <Grid container spacing={{ xs: 2, md: 2 }} sx={{ py: 1 }}>
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
        <BottomNav />
      </Box>
    </Box>
  );
}
