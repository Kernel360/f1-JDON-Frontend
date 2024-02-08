import { Box, Chip, Container, IconButton, Stack, Tab } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ChipStyle, MainStyles } from "../PageStyles";
import arrowLeft from "../../../src/assets/icons/arrow-left.svg";
import arrowRight from "../../../src/assets/icons/arrow-right.svg";
import SearchBar from "../../components/common/search-bar/SearchBar";
import BottomNav from "../../components/common/BottomNav";
import logo from "../../../src/assets/images/logo.svg";
import CompanySection from "./CompanySection";
import VideoSection from "./VideoSection";
import {
  getHotSkills,
  getLectureByKeyword,
  getMemberInfo,
  getMemberSkills,
} from "../../api/api";
import { useNavigate } from "react-router-dom";
import { theme } from "../../styles/themeMuiStyle";
// import { useCookies } from "react-cookie";

export function Main() {
  // const [cookies, setCookies, removeCookies] = useCookies(["JSESSIONID"]);
  // console.log(cookies.JSESSIONID);
  const [value, setValue] = useState("1");
  const [hotSkills, setHotSkills] = useState([]);
  const [memberSkills, setMemberSkills] = useState([]);
  const [selectedChip, setSelectedChip] = useState({});
  const [isSelected, setIsSeletected] = useState(false);
  const [lectureList, setLectureList] = useState([]);
  const [jdList, setJdList] = useState([]);
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLoggedInState")
  );

  const [search, setSearch] = useState("");
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const handleTabChange = (e, newValue) => {
    if (newValue === "2") {
      if (isLogin === "false") {
        handleConfirm();
        return;
      } else {
        GetMemberSkillData();
      }
    }
    setValue(newValue);
  };

  const handleConfirm = () => {
    if (
      window.confirm(
        "[내 맞춤 키워드]는 로그인 후에 확인 하실 수 있습니다. 로그인페이지로 이동하시겠습니까?"
      )
    ) {
      navigate("/signin");
    }
  };

  const handleSelectedChip = (keyword) => {
    console.log(keyword);
    if (keyword === "") {
      setIsSeletected(false);
    }
    setSelectedChip({
      keyword: keyword,
    });
    setIsSeletected(true);
  };

  const handleScroll = (direction) => {
    const { current: scrollContainer } = scrollRef;
    if (scrollContainer) {
      const scrollAmount = scrollContainer.clientWidth;
      if (direction === "left") {
        scrollContainer.scrollTo({
          left: scrollContainer.scrollLeft - scrollAmount,
          behavior: "smooth",
        });
      } else {
        scrollContainer.scrollTo({
          left: scrollContainer.scrollLeft + scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      setSelectedChip((prev) => ({ ...prev, keyword: e.target.value }));
      setIsSeletected(true);
    }
  };

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
  };

  const fetchHotSkills = async () => {
    try {
      const data = await getHotSkills();
      setHotSkills(data.data.skillList);
    } catch (error) {
      console.error("Error fetching hot skills:", error);
    }
  };

  const GetMemberSkillData = async () => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedInState");
    setIsLogin(storedIsLoggedIn);
    console.log(storedIsLoggedIn);
    if (storedIsLoggedIn === "true") {
      try {
        const memData = await getMemberSkills();
        const memSkillsData = memData.data.skillList || { skillList: [] };
        console.log("memSkillsData 확인중", memSkillsData);
        setMemberSkills(memSkillsData);
      } catch (error) {
        console.error("Error fetching member skills:", error);
      }
    }
  };

  // 최초 렌더링
  useEffect(() => {
    // localStorage.setItem("isLoggedInState", false);/
    fetchHotSkills();
    const fetchLectureData22 = async () => {
      try {
        const datas = await getLectureByKeyword("");
        setSelectedChip({ keyword: datas.keyword });
        setLectureList(datas.lectureList);
        setJdList(datas.jdList);
        setIsSeletected(false);
      } catch (error) {
        console.error("Error fetching data by keyword:", error);
      }
    };
    const fetchData = async () => {
      try {
        const memberData = await getMemberInfo();
        localStorage.setItem("user", JSON.stringify(memberData.data));
      } catch (error) {
        if (error.response && error.response.status === 401) {
        }
        console.error("faq 에러", error);
      }
    };
    fetchData();
    fetchLectureData22();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datas = await getLectureByKeyword(selectedChip.keyword);
        // 여기서는 datas.keyword 대신 selectedChip.keyword를 사용해야 할 것 같습니다.
        setLectureList(datas.lectureList);
        setJdList(datas.jdList);
        setIsSeletected(true);
      } catch (error) {
        console.error("Error fetching data by keyword:", error);
      }
    };

    const fetchDataNone = async () => {
      try {
        const datas = await getLectureByKeyword("");
        setLectureList(datas.lectureList);
        setJdList(datas.jdList);
        setIsSeletected(false);
        setSelectedChip({ keyword: datas.keyword });
      } catch (error) {
        console.error("Error fetching data by keyword:", error);
      }
    };

    if (isSelected && selectedChip.keyword !== "") {
      fetchData();
    }
    if (selectedChip.keyword === "" && isSelected) {
      fetchDataNone();
    }
  }, [selectedChip]);

  return (
    <Container maxWidth="md" sx={{ pb: 10, position: "relative" }}>
      <img
        src={logo}
        alt="logo"
        width={80}
        style={{ height: 50, marginTop: 10 }}
      />
      <SearchBar
        keyword={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      <Box
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          zIndex: 10,
          bgcolor: "white",
        }}
      >
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
              sx={{ ...MainStyles.ChipContainer, scrollBehavior: "smooth" }}
            >
              {memberSkills.map((skill, index) => (
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
            <IconButton
              onClick={() => handleScroll("right")}
              sx={MainStyles.IconButtonRight}
            >
              <img src={arrowRight} alt="arrow" />
            </IconButton>
          </TabPanel>
        </TabContext>
      </Box>

      <VideoSection selectedChip={selectedChip} data={lectureList} />
      <CompanySection selectedChip={selectedChip} data={jdList} />

      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSfx9-ahkuQtQVy93P_nIhBbip-S4Q6RGnvqH1FeOA_Gu2F-Lg/viewform"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block", // 블록 레벨 요소처럼 만들어 너비와 높이 적용
          height: "60px",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
          lineHeight: "60px", // 텍스트를 버튼 중앙에 위치시킴
          margin: "15px auto",
          background: theme.palette.primary.main, // theme가 정의되어 있어야 함
          fontWeight: 600,
          color: "white",
          fontSize: "18px",
          textDecoration: "none",
          padding: "0 15px", // 좌우 패딩 적용,
        }}
      >
        버그 제출
      </a>

      <BottomNav></BottomNav>
    </Container>
  );
}
