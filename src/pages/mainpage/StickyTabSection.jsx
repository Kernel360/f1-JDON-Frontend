import { Box, Chip, Stack, Tab } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ChipStyle, MainStyles } from '../PageStyles';
// import arrowLeft from 'assets/icons/arrow-left.svg';
// import arrowRight from 'assets/icons/arrow-right.svg';
import { useNavigate } from 'react-router-dom';
import { getHotSkills, getMemberSkills } from 'api/api';
import { useAuth } from './useAuth';

function StickyTabSection({ selectedChip, setSelectedChip }) {
  const { isLoginUser } = useAuth();
  const scrollRef = useRef({
    current: 'div.MuiStack-root.css-rpc19u-MuiStack-root',
  });
  const navigate = useNavigate();
  const [value, setValue] = useState('1');
  const [hotSkills, setHotSkills] = useState([]);
  const [memberSkills, setMemberSkills] = useState([]);

  useEffect(() => {
    const fetchHotSkills = async () => {
      try {
        const data = await getHotSkills();
        setHotSkills(data.data.skillList);
      } catch (error) {
        console.error('Error fetching hot skills:', error);
      }
    };
    fetchHotSkills();
  }, []);

  const GetMemberSkillData = async () => {
    if (isLoginUser) {
      try {
        const memData = await getMemberSkills();
        const memSkillsData = memData.data.skillList || { skillList: [] };
        setMemberSkills(memSkillsData);
      } catch (error) {
        console.error('Error fetching member skills:', error);
      }
    }
  };

  const handleConfirm = () => {
    window.confirm(
      '내 맞춤 키워드는 로그인 후에 확인 하실 수 있습니다. \n로그인 페이지로 이동하시겠습니까?',
    ) && navigate('/signin');
  };

  const handleTabChange = (e, newValue) => {
    if (newValue === '2') {
      if (isLoginUser === false) {
        handleConfirm();
        return;
      } else {
        GetMemberSkillData();
      }
    }
    setValue(newValue);
  };

  const handleSelectedChip = (keyword) => {
    if (keyword === '') {
      setSelectedChip({
        keyword: keyword,
        userSelected: false,
      });
    }
    setSelectedChip({
      keyword: keyword,
      userSelected: true,
    });
  };

  // const handleScroll = (direction) => {
  //   const { current: scrollContainer } = scrollRef;
  //   if (scrollContainer) {
  //     const scrollAmount = scrollContainer.clientWidth;
  //     if (direction === 'left') {
  //       scrollContainer.scrollTo({
  //         left: scrollContainer.scrollLeft - scrollAmount,
  //         behavior: 'smooth',
  //       });
  //     } else {
  //       scrollContainer.scrollTo({
  //         left: scrollContainer.scrollLeft + scrollAmount,
  //         behavior: 'smooth',
  //       });
  //     }
  //   }
  // };

  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          left: 0,
          zIndex: 10,
          bgcolor: 'white',
        }}>
        <TabContext value={value}>
          <TabList
            onChange={handleTabChange}
            sx={{ pt: 2 }}
            TabIndicatorProps={{ style: MainStyles.TabIndicator }}>
            <Tab label="요즘 뜨는 키워드" value="1" sx={MainStyles.Tab} />
            {isLoginUser ? <Tab label="내 맞춤 키워드" value="2" sx={MainStyles.Tab} /> : ''}
          </TabList>

          <TabPanel value="1" sx={MainStyles.TabPanel}>
            {/* <IconButton onClick={() => handleScroll('left')} sx={MainStyles.IconButtonLeft}>
              {scrollLeft === 0 ? '' : <img src={arrowLeft} alt="arrow" />}
            </IconButton> */}

            <Stack direction="row" spacing={0.8} ref={scrollRef} sx={MainStyles.ChipContainer}>
              {hotSkills.map((skill) => (
                <Chip
                  key={skill.id}
                  onClick={() => handleSelectedChip(skill.keyword)}
                  label={skill.keyword}
                  clickable="true"
                  variant="outlined"
                  sx={
                    selectedChip.keyword === skill.keyword
                      ? ChipStyle(selectedChip)
                      : ChipStyle(undefined)
                  }
                />
              ))}
            </Stack>

            {/* <IconButton onClick={() => handleScroll('right')} sx={MainStyles.IconButtonRight}>
              {scrollLeft === maxScroll ? '' : <img src={arrowRight} alt="arrow" />}
            </IconButton> */}
          </TabPanel>

          <TabPanel value="2" sx={MainStyles.TabPanel}>
            {/* <IconButton onClick={() => handleScroll('left')} sx={MainStyles.IconButtonLeft}>
              <img src={arrowLeft} alt="arrow" />
            </IconButton> */}
            <Stack
              direction="row"
              spacing={1}
              ref={scrollRef}
              sx={{ ...MainStyles.ChipContainer, scrollBehavior: 'smooth' }}>
              {memberSkills.map((skill) => (
                <Chip
                  key={skill.id}
                  label={skill.keyword}
                  onClick={() => handleSelectedChip(skill.keyword)}
                  clickable="true"
                  variant="outlined"
                  sx={
                    selectedChip.keyword === skill.keyword
                      ? ChipStyle(selectedChip)
                      : ChipStyle(undefined)
                  }
                />
              ))}
            </Stack>

            {/* <IconButton onClick={() => handleScroll('right')} sx={MainStyles.IconButtonRight}>
              <img src={arrowRight} alt="arrow" />
            </IconButton> */}
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

export default StickyTabSection;
