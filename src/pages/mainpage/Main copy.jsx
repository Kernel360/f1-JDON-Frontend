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
import { theme } from "../../styles/themeMuiStyle";

export function Main() {
  const [value, setValue] = useState("1");
  const [hotSkills, setHotSkills] = useState([]);
  const [memberSkills, setMemberSkills] = useState([]);
  const [selectedChip, setSelectedChip] = useState({ keyword: "" });
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
    console.log(isLogin);
    if (newValue === "2" && isLogin === "false") {
      handleConfirm();
    } else {
      setValue(newValue);
      GetMemberSkillData();
    }
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
    if (e.key === "Enter") {
      setSelectedChip((prev) => ({ ...prev, keyword: e.target.value }));
      setIsSeletected(true);
    }
  };

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
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

  const fetchHotSkills = async () => {
    try {
      const data = await getHotSkills();
      setHotSkills(data.data.skillList);
    } catch (error) {
      console.error("Error fetching hot skills:", error);
    }
  };

  const fetchLectureData = async () => {
    try {
      const datas = await getLectureByKeyword(selectedChip.keyword);
      setSelectedChip((prev) => ({
        ...prev,
        keyword: datas.keyword,
      }));
      setLectureList(datas.lectureList);
      setJdList(datas.jdList);
    } catch (error) {
      console.error("Error fetching hot skills:", error);
    }
  };

  // hotSkills 데이터를 불러오는 함수
  useEffect(() => {
    fetchHotSkills();
  }, []);

  //영상, 회사 데이터 불러오는 함수
  useEffect(() => {
    if (selectedChip.keyword === "") {
      fetchLectureData();
      console.log("최초");
    }
  }, [isSelected, selectedChip]);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedInState");
    setIsLogin(storedIsLoggedIn);
    console.log(storedIsLoggedIn);
  }, [setIsLogin]);

  // 검색어가 변경될 때마다 해당 검색어로 강의 데이터를 불러오는 함수
  useEffect(() => {
    const fetchDataByKeyword = async () => {
      // 선택이 발생하고 keyword가 비어있지 않을 때만 호출
      if (selectedChip.keyword && isSelected) {
        try {
          const datas = await getLectureByKeyword(selectedChip.keyword);
          // 여기서는 datas.keyword 대신 selectedChip.keyword를 사용해야 할 것 같습니다.
          // setSelectedChip((prev) => ({ ...prev, keyword: datas.keyword }));
          setLectureList(datas.lectureList);
          setJdList(datas.jdList);
          console.log("선택 시 수행되어야 하는 작업");
        } catch (error) {
          console.error("Error fetching data by keyword:", error);
        }
      }
    };

    fetchDataByKeyword();

    // 이제 isSelected 상태는 이 useEffect에서 직접적으로 사용되지 않기 때문에, 의존성 배열에서 제거할 수 있습니다.
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
                    setIsSeletected(true);
                  }}
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
                  onClick={() => {
                    setSelectedChip((prev) => ({
                      ...prev,
                      keyword: skill.keyword,
                    }));
                    setIsSeletected(true);
                  }}
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
      <div
        style={{
          background: theme.palette.primary.main,
          height: 60,
          borderRadius: "10px",
          textAlign: "center",
          lineHeight: "60px",
          margin: "15px auto",
        }}
      >
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfx9-ahkuQtQVy93P_nIhBbip-S4Q6RGnvqH1FeOA_Gu2F-Lg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: "100%",
            fontWeight: 600,
            color: "white",
            fontSize: "18px",
            textDecoration: "none",
          }}
        >
          버그 제출
        </a>
      </div>
      <BottomNav></BottomNav>
    </Container>
  );
}
