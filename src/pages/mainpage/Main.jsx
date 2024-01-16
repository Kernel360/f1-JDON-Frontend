import { Chip, Container, IconButton, Stack, Tab } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ChipStyle, MainStyles } from "../PageStyles";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import video1 from "../../../src/assets/images/video1.svg";
import video2 from "../../../src/assets/images/video2.svg";
import video3 from "../../../src/assets/images/video3.svg";
import company1 from "../../../src/assets/images/comany1.svg";
import company2 from "../../../src/assets/images/company2.svg";
import company3 from "../../../src/assets/images/company3.svg";
import arrowLeft from "../../../src/assets/icons/arrow-left.svg";
import arrowRight from "../../../src/assets/icons/arrow-right.svg";

import SearchBar from "../../components/common/search-bar/SearchBar";
import BottomNav from "../../components/common/BottomNav";
import CompanySection from "./CompanySection";
import VideoSection from "./VideoSection";

const HOT_SKILLS = [
  "JavaScript",
  "React",
  "Recoil",
  "Context Api",
  "everland",
  "I want to go",
  "푸바오",
  "보고시퍼요",
  "금요일",
  "내일 주말",
];
const MY_SKILLS = [11111, 22, 333333, 4, 555555, 66, 7777777, 88, 999, 1000];
let HOT = [];
const COMPANY_DATA = [
  {
    id: 0,
    name: "패스오더",
    content: "[패스오더]백엔드 개발자(Spring, Python, MSA)",
    imageUrl: company1,
  },
  {
    id: 1,
    name: "에듀템",
    content: "JAVA 스프링부트 개발자",
    imageUrl: company2,
  },
  {
    id: 2,
    name: "MOLOCO",
    content: "[MOLOCO] Senior Staff Software Engineer",
    imageUrl: company3,
  },
  {
    id: 4,
    name: "아모레퍼시픽",
    content: "content4",
    imageUrl: company2,
  },
  {
    id: 5,
    name: "이름인 아주아주아주아주아주아주 긴 회사",
    content: "content5",
    imageUrl: company3,
  },
  {
    id: 6,
    name: "appleeee",
    content: "content6",
    imageUrl: company1,
  },
];
const VIDEO_DATA = [
  {
    lectureId: 3,
    instructor: "김영한",
    title: "스프링부트 기본편",
    imageUrl: video1,
    lectureUrl: "https://www.wanted.co.kr/wd/196444",
    studentCount: 3253,
    price: 120000,
  },
  {
    lectureId: 4,
    instructor: "김영한",
    title: "스프링부트 기본편",
    imageUrl: video2,
    lectureUrl: "https://www.wanted.co.kr/wd/196444",
    studentCount: 3253,
    price: 120000,
  },
  {
    lectureId: 31,
    instructor: "김영한",
    title: "스프링부트 기본편",
    imageUrl: video3,
    lectureUrl: "https://www.wanted.co.kr/wd/196444",
    studentCount: 3253,
    price: 120000,
  },
];
async function getHotSkills() {
  fetch("/api/v1/skills/hot")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      return data.data;
    })
    .catch((error) => console.error("Error fetching data:", error));
}

export function Main() {
  const [value, setValue] = useState("1");
  const [selectdChip, setSelectedChip] = useState(HOT_SKILLS[0]);
  const [hotSkills, setHotSkills] = useState([]); // 빈 배열로 초기화
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
    const fetchHotSkills = async () => {
      try {
        const response = await fetch("/api/v1/skills/hot");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const hotSkillsData = data.data || []; // 데이터가 없는 경우 빈 배열로 처리
        console.log(hotSkillsData.skillList);
        setHotSkills(hotSkillsData.skillList.map((skill) => skill.keyword));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHotSkills();
  }, []); // 빈 배열을 두어 한 번만 실행되도록 설정

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
            {hotSkills.map((skill, index) => (
              <Chip
                key={index}
                onClick={() => {
                  setSelectedChip(HOT_SKILLS[index]);
                }}
                label={skill}
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
      <VideoSection selectdChip={selectdChip} data={VIDEO_DATA} />
      <CompanySection selectdChip={selectdChip} data={COMPANY_DATA} />
      <BottomNav></BottomNav>
    </Container>
  );
}
