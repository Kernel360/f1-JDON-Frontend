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

    if (!datas) {
      fetchData();
    }
  }, [currentPage, datas]);

  const handlePageChange = (event, value) => {
    console.log(`현재 페이지: ${value}`);
    setCurrentPage(value);
  };

  return (
    <Box maxWidth="md" paddingX={"16px"} sx={{ width: "100%" }}>
      <Header title={"찜"} />
      <Box mt={2} maxWidth="md" sx={{ padding: 0 }}>
        <Grid container spacing={{ xs: 2, md: 2 }} sx={{ py: 1 }}>
          {datas && datas.length > 0 ? (
            datas.map((item, index) => (
              <Grid item xs={12} sm={4} md={4} key={index}>
                <VideoCard data={item} myFavorite={true} />
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
      </Box>
    </Box>
  );
}
