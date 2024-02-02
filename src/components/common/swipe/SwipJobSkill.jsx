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
  Typography,
} from "@mui/material";
import { ChipStyle, MainStyles } from "../../../pages/PageStyles";
import TabPanel from "./TabPanel";
import { buttonStyle } from "../navigation-btn/NavigationBtnStyles";
import {
  skillsButton,
  infoBasicStyles,
} from "../../../pages/info/InfoStyles.js";
import { getJobCategory } from "../../../api/api";

export default function SwipJobSkill({ jobId, jobSkill }) {
  const SKILLS = [
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
  console.log("jobId", jobId);
  console.log("jobSkill", jobSkill);
  const [checkedItems, setCheckedItems] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [jobCategories, setJobCategories] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const scrollRef = useRef(null);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getJobCategory();
        setJobCategories(data.jobGroupList[0].jobCategoryList);
        console.log("직무확인", data.jobGroupList[0].jobCategoryList);
      } catch (error) {
        console.error("swipJobSkill 파일 통신에러", error);
      }
    };
    fetchData();
  }, []);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCheckboxChange = (index, event) => {
    const isChecked = event.target.checked;

    setCheckedItems((prevCheckedItems) => {
      const checkedCount = prevCheckedItems.length;

      if (isChecked) {
        if (checkedCount < 3) {
          return [...prevCheckedItems, SKILLS[index]];
        } else {
          return prevCheckedItems;
        }
      } else {
        return prevCheckedItems.filter((el) => el !== SKILLS[index]);
      }
    });
  };

  const renderChips = () => {
    return (
      <Stack
        direction="row"
        spacing={0.8}
        ref={scrollRef}
        sx={{ ...MainStyles.ChipContainer, padding: "10px 16px" }}
      >
        {checkedItems.map((item, index) => (
          <Chip
            key={index}
            label={item}
            variant={"filled"}
            sx={ChipStyle(true)}
          />
        ))}
      </Stack>
    );
  };

  const renderCheckboxes = () => {
    return (
      <FormControl component="fieldset">
        <FormGroup>
          {SKILLS.map((item, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={checkedItems.includes(SKILLS[index])}
                  onChange={(event) => handleCheckboxChange(index, event)}
                />
              }
              label={item}
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
              {jobCategories.map((category) => (
                <Tab key={category.id} label={category.name} />
              ))}
            </Tabs>
            {["프론트엔드", "백엔드"].map((label, index) => (
              <TabPanel key={index} value={tabValue} index={index}>
                {label === "프론트엔드" ? renderCheckboxes() : "Item Two"}
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
