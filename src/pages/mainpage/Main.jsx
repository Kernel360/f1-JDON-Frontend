import { Box, Chip, Container, IconButton, Stack, Tab } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ChipStyle, MainStyles } from "../PageStyles";
import arrowLeft from "../../../src/assets/icons/arrow-left.svg";
import arrowRight from "../../../src/assets/icons/arrow-right.svg";
import SearchBar from "../../components/common/search-bar/SearchBar";
import BottomNav from "../../components/common/BottomNav";
import CompanySection from "./CompanySection";
import VideoSection from "./VideoSection";
import {
  getHotSkills,
  getLectureByKeyword,
  getMemberSkills,
} from "../../api/api";
import { useNavigate } from "react-router-dom";

export function Main() {
  const [value, setValue] = useState("1");
  const [hotSkills, setHotSkills] = useState([]);
  const [memberSkills, setMemberSkills] = useState([]);
  const [selectedChip, setSelectedChip] = useState("");

  const [lectureList, setLectureList] = useState([]);
  const [jdList, setJdList] = useState([]);
  const isLogin = localStorage.getItem("isLoggedInState");

  const [search, setSearch] = useState("");
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const handleTabChange = (e, newValue) => {
    if (newValue === "2" && !isLogin) {
      handleConfirm();
    } else {
      setValue(newValue);
      GetMemberSkillData();
    }
  };
  const handleConfirm = () => {
    if (
      window.confirm("[내 맞춤 키워드]는 로그인 후에 확인 하실 수 있습니다")
    ) {
      navigate("/signin");
    }
  };

  const GetMemberSkillData = async () => {
    if (isLogin) {
      try {
        const memData = await getMemberSkills();
        const memSkillsData = memData.data.skillList || { skillList: [] };
        console.log("memSkillsData 확인중", memSkillsData);
        setMemberSkills(memSkillsData);
      } catch (error) {
        console.error("Error fetching member skills:", error);
      }
    } else {
      alert("로그인 후 [내 맞춤 키워드]를 확인 하실 수 있습니다");
    }
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
    if (e.key === "Enter" && e.target.value) {
      setSelectedChip((prev) => ({ ...prev, keyword: e.target.value }));
    }
  };

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    if (!newSearch) {
      setSelectedChip("");
    }
  };

  // hotSkills 데이터를 불러오는 함수
  useEffect(() => {
    const fetchHotSkills = async () => {
      try {
        const data = await getHotSkills();
        setHotSkills(data.data.skillList);
        // 선택된 칩이 없으면 첫 번째 핫스킬을 선택된 칩으로 설정
        if (data.data.skillList.length > 0 && !selectedChip) {
          setSelectedChip((prev) => ({
            ...prev,
            keyword: data.data.skillList[0].keyword,
          }));
        }
      } catch (error) {
        console.error("Error fetching hot skills:", error);
      }
    };
    fetchHotSkills();
  }, [selectedChip]);

  // 검색어가 변경될 때마다 해당 검색어로 강의 데이터를 불러오는 함수
  useEffect(() => {
    console.log(selectedChip);
    const fetchDataByKeyword = async () => {
      try {
        const datas = await getLectureByKeyword(selectedChip.keyword);
        console.log(datas);
        setLectureList(datas.lectureList);
        setJdList(datas.jdList);
      } catch (error) {
        console.error("Error fetching data by keyword:", error);
      }
    };
    fetchDataByKeyword();
  }, [selectedChip]);

  return (
    <Container maxWidth="md" sx={{ pb: 10, position: "relative" }}>
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
                  onClick={() => {
                    setSelectedChip((prev) => ({
                      ...prev,
                      keyword: skill.keyword,
                    }));
                  }}
                  label={skill.keyword}
                  clickable={true}
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
                  onClick={() => {
                    setSelectedChip(skill);
                  }}
                  clickable={true}
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
      >
        버그 제출
      </a>
      <BottomNav></BottomNav>
    </Container>
  );
}
