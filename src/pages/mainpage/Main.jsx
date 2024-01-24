import { Chip, Container, IconButton, Stack, Tab } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ChipStyle, MainStyles } from "../PageStyles";
import arrowLeft from "../../../src/assets/icons/arrow-left.svg";
import arrowRight from "../../../src/assets/icons/arrow-right.svg";
import SearchBar from "../../components/common/search-bar/SearchBar";
import BottomNav from "../../components/common/BottomNav";
import CompanySection from "./CompanySection";
import VideoSection from "./VideoSection";
import { getHotSkills, getLecture } from "../../api/api";

const MY_SKILLS = [11111, 22, 333333, 4, 555555, 66, 7777777, 88, 999, 1000];

export function Main() {
  const [value, setValue] = useState("1");
  const [hotSkills, setHotSkills] = useState([]); // 빈 배열로 초기화
  const [selectdChip, setSelectedChip] = useState();
  const [lecture, setLecture] = useState([]);
  const [companies, setCompanies] = useState([]);
  const scrollRef = useRef(null);

  const handleTabChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const handleScroll = (direction) => {
    const { current: scrollContainer } = scrollRef;

    if (scrollContainer) {
      const scrollAmount = scrollContainer.clientWidth; // 현재 보이는 영역의 너비
      if (direction === "left") {
        scrollContainer.scrollLeft -= scrollAmount; // 왼쪽으로 스크롤
      } else {
        scrollContainer.scrollLeft += scrollAmount; // 오른쪽으로 스크롤
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHotSkills();
        const hotSkillsData = data.data.skillList || { skillList: [] }; // 데이터가 없는 경우 빈 객체로 처리
        //console.log("getHotSkills 확인중", data);
        setHotSkills(hotSkillsData);
        setSelectedChip(hotSkillsData[0].keyword);
        const lectureData = await getLecture(1);
        setLecture((prev) => [...prev, ...lectureData.lectureList]);
        console.log(lecture);
        setCompanies(lectureData.jdList);
      } catch (error) {
        console.error("Error fetching hot skills:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="md" sx={{ pb: 10 }}>
      <SearchBar />
      <TabContext value={value}>
        <TabList
          onChange={handleTabChange}
          sx={{ pt: 2 }}
          TabIndicatorProps={{ style: MainStyles.TabIndicator }}
        >
          <Tab label="요즘 뜨는 키워드" value="1" sx={MainStyles.Tab} />
          <Tab label="내 맞춤 키워드" value="2" sx={MainStyles.Tab} />
        </TabList>

        <TabPanel value="1" sx={MainStyles.TabPanel}>
          <IconButton
            onClick={() => handleScroll("left")}
            sx={MainStyles.IconButtonLeft}
          >
            <img src={arrowLeft} alt="arrow" />
          </IconButton>
          <Stack
            direction="row"
            spacing={0.8}
            ref={scrollRef}
            sx={MainStyles.ChipContainer}
          >
            {hotSkills.map((skill) => (
              <Chip
                key={skill.id}
                onClick={() => {
                  setSelectedChip(skill.keyword);
                }}
                label={skill.keyword}
                clickable={true}
                variant="outlined"
                sx={
                  selectdChip === skill.keyword
                    ? ChipStyle(selectdChip)
                    : ChipStyle(undefined)
                }
              />
            ))}
          </Stack>
          <IconButton
            onClick={() => handleScroll("right")}
            sx={MainStyles.IconButtonRight}
          >
            <img src={arrowRight} alt="arrow" />
          </IconButton>
        </TabPanel>

        <TabPanel value="2" sx={MainStyles.TabPanel}>
          <IconButton
            onClick={() => handleScroll("left")}
            sx={MainStyles.IconButtonLeft}
          >
            <img src={arrowLeft} alt="arrow" />
          </IconButton>
          <Stack
            direction="row"
            spacing={1}
            ref={scrollRef}
            sx={MainStyles.ChipContainer}
          >
            {MY_SKILLS.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onClick={() => setSelectedChip(MY_SKILLS[index])}
                clickable={true}
                variant="outlined"
                sx={
                  selectdChip === skill
                    ? ChipStyle(selectdChip)
                    : ChipStyle(undefined)
                }
              />
            ))}
          </Stack>
          <IconButton
            onClick={() => handleScroll("right")}
            sx={MainStyles.IconButtonRight}
          >
            <img src={arrowRight} alt="arrow" />
          </IconButton>
        </TabPanel>
      </TabContext>

      <VideoSection selectdChip={selectdChip} data={lecture} />
      <CompanySection selectdChip={selectdChip} data={companies} />
      <BottomNav></BottomNav>
    </Container>
  );
}
