import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  SwipeableDrawer,
  Checkbox,
  Button,
  Chip,
  Stack,
  Tab,
  Tabs,
  FormControl,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { ChipStyle, MainStyles } from "../../../pages/PageStyles";
import TabPanel from "./TabPanel";
import { buttonStyle } from "../navigation-btn/NavigationBtnStyles";
import { skillsButton } from "../../../pages/info/InfoStyles.js";
import { getJobCategory, getSkillsOnJD } from "../../../api/api";

export default function SwipJobSkill({
  jobId,
  setJobId,
  selectedJobSkill,
  setSelectedJobSkill,
}) {
  console.log("jobId", jobId);
  console.log("selectedJobSkill", selectedJobSkill);
  const initialJobId = useRef(jobId);
  // const [categoryId, setCategoryId] = useState(jobId);
  const [checkedItems, setCheckedItems] = useState(selectedJobSkill);
  // tabs은 컨트롤은 배열 0,1부터라 직군별 id에 따라 맞춤
  const [tabValue, setTabValue] = useState(jobId == 2 ? 0 : 1);
  const [jobCategories, setJobCategories] = useState([]);
  const [jobSkills, setJobSkills] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // const categoryIdRef = useRef(categoryId);
  // console.log("!!!categoryId", categoryId);

  const LOCAL_STORAGE_KEY = "checkedItems";

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // 초기 들어올때 세팅해야할 것
  useEffect(() => {
    setCheckedItems(selectedJobSkill);
  }, []);

  // 변경시 실행되야할 것
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await getJobCategory();
        setJobCategories(categoryData.jobGroupList[0].jobCategoryList);

        const skillsData = await getSkillsOnJD(jobId);
        setJobSkills(skillsData.skillList);
      } catch (error) {
        console.error("swipJobSkill 파일 통신에러", error);
      }
    };
    fetchData();
  }, []);

  console.log("checkedItems 이상", checkedItems);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    setJobId(newValue == 0 ? 2 : 3);
    if (jobId !== initialJobId) {
      setCheckedItems([]);
    } else {
      setCheckedItems(selectedJobSkill);
    }
  };

  const handleCheckboxChange = (skillId, event) => {
    const isChecked = event.target.checked;

    setCheckedItems((prevCheckedItems) => {
      const checkedCount = prevCheckedItems.length;

      if (isChecked) {
        if (checkedCount < 3) {
          return [...prevCheckedItems, skillId];
        } else {
          return prevCheckedItems;
        }
      } else {
        return prevCheckedItems.filter((el) => el !== skillId);
      }
    });
    // setSelectedJobSkill(checkedItems);

    console.log("체크된 기술", checkedItems);
  };

  const renderChips = () => {
    return (
      <Stack
        direction="row"
        spacing={0.8}
        sx={{ ...MainStyles.ChipContainer, padding: "10px 16px" }}
      >
        {Array.isArray(checkedItems) &&
          checkedItems.map((skillId) => {
            const foundSkill = jobSkills.find(
              (skill) => skill.skillId === skillId
            );
            const label = foundSkill ? foundSkill.keyword : "";
            return (
              label !== "" && (
                <Chip
                  key={skillId}
                  label={label}
                  variant={"filled"}
                  sx={ChipStyle(true)}
                />
              )
            );
          })}
      </Stack>
    );
  };

  const renderCheckboxes = () => {
    return (
      <FormControl component="fieldset">
        <FormGroup>
          {jobSkills.map((item) => (
            <FormControlLabel
              key={item.skillId}
              control={
                <Checkbox
                  checked={checkedItems.includes(item.skillId)}
                  onChange={(event) =>
                    handleCheckboxChange(item.skillId, event)
                  }
                />
              }
              label={item.keyword}
            />
          ))}
        </FormGroup>
      </FormControl>
    );
  };

  return (
    <div>
      <Button
        // variant="outlined"
        onClick={toggleDrawer(true)}
        fullWidth
        sx={skillsButton}
      >
        클릭하여 선택하기
      </Button>
      <SwipeableDrawer
        anchor="bottom"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          "& .MuiDrawer-paper": {
            borderRadius: "16px 16px 0 0",
          },
        }}
      >
        <Box sx={{ width: "100%", padding: 3 }}>
          <Box sx={{ padding: "15px", borderBottom: "1px solid #F5F5F7" }}>
            {renderChips()}
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              // height: "50vw",
              "@media (min-width: 300px)": {
                height: "450px",
              },
              "@media (min-width: 960px)": {
                height: "500px",
              },
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={tabValue}
              onChange={handleChangeTab}
              aria-label="Vertical tabs example"
              sx={{
                borderRight: 1,
                borderColor: "divider",
                minWidth: "120px", // 탭의 최소 너비
                flex: "0 0 auto",
              }}
            >
              {jobCategories.map((category, index) => (
                <Tab key={category.id} label={category.name} value={index} />
              ))}
            </Tabs>
            {["프론트엔드", "백엔드"].map((label, index) => (
              <TabPanel key={index} value={tabValue} index={index}>
                {renderCheckboxes()}
              </TabPanel>
            ))}
          </Box>
        </Box>

        <Box sx={{ padding: "20px" }}>
          <Button
            fullWidth
            sx={{ ...buttonStyle.Button, marginTop: "10px" }}
            onClick={toggleDrawer(false)}
          >
            완료
          </Button>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}
