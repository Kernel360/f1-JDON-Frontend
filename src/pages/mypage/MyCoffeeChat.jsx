import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Container } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Header from 'components/common/Header';
import CoffeeChatCard from 'components/common/card/CoffeeChatCard';
import { getMyCoffeeChat, getSignCoffeeChat } from 'api/api';
import Pagenation from 'components/common/Pagenation';
import { MainStyles } from '../PageStyles';
import { useRecoilValue } from 'recoil';
import { kindOfJdState } from 'recoil/atoms';
import { MYPAGE_CHILD } from 'constants/headerProps';

export default function MyCoffeeChat() {
  const [value, setValue] = useState('1');
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState({});
  const [coffeeDatas, setCoffeeDatas] = useState([]);
  const kindOfJd = useRecoilValue(kindOfJdState);

  const handleChange = (event, value) => {
    setValue(value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (value === '1') {
          res = await getMyCoffeeChat(currentPage - 1);
          setCoffeeDatas(res.content || []);
        } else if (value === '2') {
          res = await getSignCoffeeChat(currentPage - 1);
          setCoffeeDatas(res.content || []);
        }

        setPage(res.pageInfo || {});
      } catch (error) {
        console.error('MyCoffeeChat 통신에러', error);
      }
    };
    fetchData();
  }, [value, currentPage]);

  return (
    // <Container maxWidth="md" paddingX={"16px"} sx={{ width: "100%" }}>
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
              onChange={handleChange}
              aria-label="내가 오픈한 커피챗 및 내가 신청한 커피챗 선택 탭">
              <Tab
                label="내가 오픈한 커피챗"
                value="1"
                sx={{ ...MainStyles.TabPanel, flex: 1, maxWidth: 'none' }}
              />
              <Tab
                label="내가 신청한 커피챗"
                value="2"
                sx={{ ...MainStyles.TabPanel, flex: 1, maxWidth: 'none' }}
              />
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
              <Typography
                variant="h6"
                color="textSecondary"
                sx={{
                  textAlign: 'center',
                  fontSize: 16,
                  mt: 3,
                }}>
                오픈한 커피챗이 없습니다!
              </Typography>
            ) : (
              <Grid Grid container spacing={{ xs: 2, md: 2 }}>
                {coffeeDatas.map((data, index) => (
                  <Grid item xs={12} sm={6} md={6} key={index}>
                    <CoffeeChatCard data={data} kindOfJd={kindOfJd} />
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
              <Typography
                variant="h6"
                color="textSecondary"
                sx={{
                  textAlign: 'center',
                  fontSize: 16,
                  mt: 3,
                }}>
                신청한 커피챗이 없습니다!
              </Typography>
            ) : (
              <Grid container spacing={{ xs: 2, md: 2 }}>
                {coffeeDatas.map((data, index) => (
                  <Grid item xs={12} sm={6} md={6} key={index}>
                    <CoffeeChatCard data={data} kindOfJd={kindOfJd} />
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
