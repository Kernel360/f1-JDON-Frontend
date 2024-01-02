import {
  Box,
  Chip,
  Container,
  Grid,
  IconButton,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ChipStyle, MainStyles } from "./PageStyles";
import {
  ArrowBackIos,
  ArrowForwardIos,
  VideoCallRounded,
} from "@mui/icons-material";
import video1 from "../../src/assets/images/video1.svg";
import video2 from "../../src/assets/images/video2.svg";
import video3 from "../../src/assets/images/video3.svg";
import SearchBar from "../components/common/search-bar/SearchBar";
import CompanyCard from "../components/common/card/CompanyCard";
import BottomNav from "../components/common/BottomNav";
import VideoCard from "../components/common/card/VideoCard";

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

const COMPANY_DATA = [
  {
    id: 0,
    name: "패스오더",
    content: "[패스오더]백엔드 개발자(Spring, Python, MSA)",
  },
  { id: 1, name: "에듀템", content: "JAVA 스프링부트 개발자" },
  { id: 2, name: "MOLOCO", content: "[MOLOCO] Senior Staff Software Engineer" },
  { id: 4, name: "아모레퍼시픽", content: "content4" },
  {
    id: 5,
    name: "이름인 아주아주아주아주아주아주 긴 회사",
    content: "content5",
  },
  { id: 6, name: "apple", content: "content6" },
];
const VIDEO_DATA = [
  {
    id: 0,
    name: "지렁이",
    content: "javascript 기초",
    price: "2000원",
    img: video1,
  },
  {
    id: 1,
    name: "레오",
    content: "Spring Boot - 나만의 포트폴리오 사이트 만들기",
    price: "7000원",
    img: video2,
  },
  {
    id: 2,
    name: "연세IT미래교육원",
    content: "[연세IT미래교육원] 데이터 분석을 위한 올인원 취업캠프",
    price: "0원",
    img: video3,
  },
];

export function Main() {
  const [value, setValue] = useState("1");
  const [selectdChip, setSelectedChip] = useState(HOT_SKILLS[0]);
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

  return (
    <Container maxWidth="md" sx={{ pb: 10 }}>
      <SearchBar />
      <TabContext value={value}>
        <TabList
          onChange={handleTabChange}
          sx={{ pt: 4 }}
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
            <ArrowBackIos />
          </IconButton>
          <Stack
            direction="row"
            spacing={1}
            ref={scrollRef}
            sx={MainStyles.ChipContainer}
          >
            {HOT_SKILLS.map((skill, index) => (
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
            <ArrowForwardIos />
          </IconButton>
        </TabPanel>

        <TabPanel value="2" sx={MainStyles.TabPanel}>
          <IconButton
            onClick={() => handleScroll("left")}
            sx={MainStyles.IconButtonLeft}
          >
            <ArrowBackIos />
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
            <ArrowForwardIos />
          </IconButton>
        </TabPanel>
      </TabContext>

      <Box sx={{ mt: 4 }}>
        <Typography sx={MainStyles.TypoGraphy}>
          <span style={{ color: "#FF814D", fontWeight: 600 }}>
            {selectdChip}
          </span>{" "}
          학습 영상
        </Typography>
        <Grid container spacing={{ xs: 2, md: 2 }}>
          {VIDEO_DATA.map((item, index) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
              <VideoCard
                name={item.name}
                content={item.content}
                price={item.price}
                img={item.img}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ mt: 12 }}>
        <Typography sx={MainStyles.TypoGraphy}>
          <span style={{ color: "#FF814D", fontWeight: 600 }}>
            {" "}
            {selectdChip}
          </span>{" "}
          에 관심있는 회사는 여기에요!
        </Typography>
        <Grid container spacing={{ xs: 2, md: 2 }}>
          {COMPANY_DATA.map((item, index) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
              <CompanyCard name={item.name} content={item.content} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <BottomNav></BottomNav>
    </Container>
  );
}
