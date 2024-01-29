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

export default function SwipJobSkill({
  skills = ["JavaScript", "React", "Recoil"],
}) {
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

  const [checkedItems, setCheckedItems] = useState(skills || []);
  console.log("이건?", checkedItems, skills);
  const [tabValue, setTabValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    // setCheckedItems(skills);
    console.log("직무선택", checkedItems);
  }, [checkedItems]);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  };

  const handleCheckboxChange = (index, event) => {
    const isChecked = event.target.checked;
    console.log("체크값의 상태", SKILLS[index], isChecked);

    if (isChecked === false && checkedItems.includes(SKILLS[index])) {
      const newChecked = checkedItems.filter((el) => el !== SKILLS[index]);
      console.log("!!!!!", newChecked);
      setCheckedItems(newChecked);
    }

    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = [...prevCheckedItems];
      newCheckedItems[index] = !newCheckedItems[index];

      // 최대 3개까지만 선택 가능하도록
      const checkedCount = newCheckedItems.filter(Boolean).length;
      if (checkedCount <= 3) {
        return newCheckedItems;
      } else {
        // 이미 3개 이상이 선택되어 있으면 해당 항목의 체크를 되돌림
        newCheckedItems[index] = !newCheckedItems[index];
        return newCheckedItems.filter(Boolean); // undefined나 null을 필터링하여 제거
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
            // onClick={() => setSelectedChip(SKILLS[index])}
            label={SKILLS[index]}
            // clickable={true}
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
                  checked={checkedItems[index] || false}
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
      <Typography sx={{ fontSize: "16px", color: "#545459" }}>
        직무 및 기술 스택
      </Typography>
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
          <Box sx={{ paddig: "15px", borderBottom: "1px solid #F5F5F7" }}>
            {renderChips()}
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              height: "50vw",
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
              {["프론트엔드", "백엔드"].map((label, index) => (
                <Tab key={index} label={label} {...a11yProps(index)} />
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
