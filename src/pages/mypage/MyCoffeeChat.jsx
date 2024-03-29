import { useCallback, useEffect, useState } from 'react';

import { getMyCoffeeChat, getSignCoffeeChat } from 'api/api';
import CoffeeChatCard from 'components/common/card/CoffeeChatCard';
import Header from 'components/common/header/Header';
import Pagenation from 'components/common/pagenation/Pagenation';
import { MYPAGE_CHILD } from 'constants/headerProps';
import { MainStyles } from 'pages/PageStyles';
import { useLocation } from 'react-router-dom';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Grid, Tab, Typography } from '@mui/material';

export default function MyCoffeeChat() {
  const [value, setValue] = useState(localStorage.getItem('tap_value') || '1');
  const [currentPage, setCurrentPage] = useState(Number(localStorage.getItem('page')) || 1);
  const [page, setPage] = useState({});
  const [coffeeDatas, setCoffeeDatas] = useState([]);
  const kindOfJd = JSON.parse(localStorage.getItem('jobCategories'));

  const { pathname } = useLocation();

  const handleTabChange = (_, value) => {
    setValue(value);
    setCurrentPage(1);
  };

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };
  const renderNoDataMessage = (kind) => (
    <Typography
      variant="h6"
      color="textSecondary"
      sx={{ textAlign: 'center', fontSize: 15, mt: 3 }}>
      {kind}한 커피챗이 없습니다!
    </Typography>
  );
  const refetchData = useCallback(async () => {
    try {
      let res;
      if (value === '1') {
        res = await getMyCoffeeChat(currentPage - 1);
      } else if (value === '2') {
        res = await getSignCoffeeChat(currentPage - 1);
      }
      if (res) {
        setCoffeeDatas(res.content || []);
        setPage(res.pageInfo || {});
      }
    } catch (error) {
      console.error('MyCoffeeChat 데이터 갱신 중 오류 발생', error);
    }
  }, [value, currentPage]);

  useEffect(() => {
    refetchData();
  }, [refetchData]);

  useEffect(() => {
    localStorage.setItem('tap_value', value);
  }, [value]);

  return (
    <Container
      maxWidth="md"
      paddingX={'16px'}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
      <Header title={MYPAGE_CHILD.title} url={MYPAGE_CHILD.url} />
      <Box mt={2}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleTabChange}
              aria-label="내가 오픈한 커피챗 및 내가 신청한 커피챗 선택 탭">
              <Tab label="오픈한 커피챗" value="1" sx={MainStyles.TabPanel} />
              <Tab label="신청한 커피챗" value="2" sx={MainStyles.TabPanel} />
            </TabList>
          </Box>
          <TabPanel
            value="1"
            sx={{
              flexGrow: 1,
              '&.MuiTabPanel-root': {
                paddingX: 0,
              },
            }}>
            {coffeeDatas.length === 0 ? (
              renderNoDataMessage('오픈')
            ) : (
              <Grid Grid container spacing={{ xs: 2, md: 2 }}>
                {coffeeDatas.map((data, index) => (
                  <Grid item xs={12} sm={6} md={6} key={index}>
                    <CoffeeChatCard
                      data={data}
                      kindOfJd={kindOfJd}
                      isMyCoffeeChat={false}
                      pathName={pathname}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
            {coffeeDatas.length > 0 && (
              <Box mt={0}>
                <Pagenation
                  pageCount={page?.totalPages}
                  currentPage={currentPage}
                  onChange={handlePageChange}
                />
              </Box>
            )}
          </TabPanel>
          <TabPanel
            value="2"
            sx={{
              flexGrow: 1,
              '&.MuiTabPanel-root': {
                paddingX: 0,
              },
            }}>
            {!coffeeDatas.length > 0 ? (
              renderNoDataMessage('신청')
            ) : (
              <Grid container spacing={{ xs: 2, md: 2 }}>
                {coffeeDatas.map((data, index) => (
                  <Grid item xs={12} sm={6} md={6} key={index}>
                    <CoffeeChatCard
                      data={data}
                      kindOfJd={kindOfJd}
                      isMyCoffeeChat={true}
                      refetchData={refetchData}
                      pathName={pathname}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
            <Box sx={{ flexGrow: 1 }} />

            {coffeeDatas.length > 0 && (
              <Pagenation
                pageCount={page?.totalPages}
                currentPage={currentPage}
                onChange={handlePageChange}
              />
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}
