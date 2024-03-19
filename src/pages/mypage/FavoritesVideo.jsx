import { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import BottomNav from 'components/common/BottomNav';
import VideoCard from 'components/common/card/VideoCard';
import { getFavoriteVideo } from 'api/api';
import Header from 'components/common/Header';
import { MYPAGE_CHILD } from 'constants/headerProps';
import PaginationComponent from 'components/common/Pagenation';
import SkeletonLoader from 'components/common/skeleton/video-card/SkeletonLoader';

export default function FavoritesVideo() {
  const [datas, setDatas] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFavoriteChanged, setIsFavoriteChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState();
  const [foundTxt, setFoundTxt] = useState('');

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await getFavoriteVideo(currentPage - 1);
        setDatas(res.data.content);
        setPage(res.data.pageInfo);
      } catch (error) {
        console.error('getFavoriteVideo API 에러', error);
      }
      const timer = setTimeout(() => {
        setLoading(false);
      }, 200);
      return () => {
        clearTimeout(timer);
      };
    })();
    setIsFavoriteChanged(false);

    const timer = setTimeout(() => {
      setFoundTxt('찜한 영상이 없습니다.');
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [currentPage]);

  useEffect(() => {
    if (isFavoriteChanged) {
      (async () => {
        try {
          let res = await getFavoriteVideo(currentPage - 1);
          if (res.data.content.length === 0 && currentPage - 1 !== 0) {
            res = await getFavoriteVideo(currentPage - 2);
            setCurrentPage(currentPage - 1);
          }
          setDatas(res.data.content);
          setPage(res.data.pageInfo);
        } catch (error) {
          console.error('getFavoriteVideo API 에러', error);
        }
      })();
      setIsFavoriteChanged(false); // isFavoriteChanged 상태 초기화
    }
  }, [currentPage, isFavoriteChanged]);

  const handlePageChange = (_, newPage) => {
    setCurrentPage(newPage);
  };

  const handleFavoriteChange = () => {
    setIsFavoriteChanged(true);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '95vh',
        minwidth: '100vw',
        pb: 10,
      }}>
      <Header title={MYPAGE_CHILD.title} url={MYPAGE_CHILD.url} />
      {loading ? (
        <SkeletonLoader count={12} />
      ) : (
        <Grid container spacing={{ xs: 2, md: 2 }} sx={{ px: 2, py: 1 }}>
          {datas && datas.length > 0 ? (
            datas.map((item, index) => (
              <Grid item xs={12} sm={4} md={4} key={index}>
                <VideoCard data={item} myFavorite={true} onSuccess={handleFavoriteChange} />
              </Grid>
            ))
          ) : (
            <Box mt={9} sx={{ width: '100%' }}>
              <Typography
                variant="h6"
                color="textSecondary"
                sx={{
                  textAlign: 'center',
                  fontSize: 16,
                  mt: 3,
                }}>
                {foundTxt}
              </Typography>
            </Box>
          )}
        </Grid>
      )}

      {datas && (
        <Box mt={4}>
          <PaginationComponent
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
