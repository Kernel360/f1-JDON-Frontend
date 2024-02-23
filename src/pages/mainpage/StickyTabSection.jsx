import { Box, Chip, IconButton, Stack, Tab } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ChipStyle, MainStyles } from "../PageStyles";
import arrowLeft from "../../../src/assets/icons/arrow-left.svg";
import arrowRight from "../../../src/assets/icons/arrow-right.svg";
import { useNavigate } from "react-router-dom";
import { getHotSkills, getMemberSkills } from "../../api/api";

function StickyTabSection({ selectedChip, setSelectedChip, isLogin }) {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const [hotSkills, setHotSkills] = useState([]);
  const [memberSkills, setMemberSkills] = useState([]);

  const handleConfirm = () => {
    if (
      window.confirm(
        "[내 맞춤 키워드]는 로그인 후에 확인 하실 수 있습니다. 로그인페이지로 이동하시겠습니까?"
      )
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
    }
  };

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
  const handleSelectedChip = (keyword) => {
    if (keyword === "") {
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

  useEffect(() => {
    const fetchHotSkills = async () => {
      try {
        const data = await getHotSkills();
        setHotSkills(data.data.skillList);
      } catch (error) {
        console.error("Error fetching hot skills:", error);
      }
    };
    fetchHotSkills();
  }, []);
  return (
    <>
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
            {isLogin ? (
              <Tab label="내 맞춤 키워드" value="2" sx={MainStyles.Tab} />
            ) : (
              ""
            )}
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
    </>
  );
}

export default StickyTabSection;
