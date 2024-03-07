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
import { getSkillsOnJD } from "../../../api/api";
import { useRecoilState } from "recoil";
import { jobIdState, selectedJobSkillState } from "../../../recoil/atoms";

export default function SwipJobSkill({ jobCategories }) {
  const [jobId, setJobId] = useRecoilState(jobIdState);
  const [selectedJobSkill, setSelectedJobSkill] = useRecoilState(
    selectedJobSkillState
  );
  const [tabValue, setTabValue] = useRecoilState(jobIdState);

  const initialJobId = useRef(jobId);
  const initialSelectedJobSkill = useRef(selectedJobSkill);
  const [jobSkills, setJobSkills] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        if (jobId) {
          const skillsData = await getSkillsOnJD(jobId);
          setJobSkills(skillsData.skillList);
        }
      } catch (error) {
        console.error("getSkillsOnJD 오류", error);
      } finally {
        setLoading(false);
      }
    };

    // 데이터 로드가 완료되면 로컬 스토리지에 저장
    localStorage.setItem("selectedJobSkill", JSON.stringify(selectedJobSkill));
    localStorage.setItem("tabValue", JSON.stringify(tabValue));

    if (jobId !== initialJobId.current) {
      setSelectedJobSkill([]);
    } else {
      setSelectedJobSkill(initialSelectedJobSkill.current);
    }
    fetchSkills();
  }, [jobId]);

  useEffect(() => {
    // 데이터 로드가 완료되면 로컬 스토리지에 저장
    localStorage.setItem("selectedJobSkill", JSON.stringify(selectedJobSkill));
    localStorage.setItem("tabValue", JSON.stringify(tabValue));

    console.log("selectedJobSkill", selectedJobSkill);
  }, [loading]);

  const handleChangeTab = (_, newValue) => {
    setTabValue(newValue);
    setJobId(newValue);
  };

  const handleCheckboxChange = (skillId, event) => {
    const isChecked = event.target.checked;

    setSelectedJobSkill((prevCheckedItems) => {
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
  };

  const handleSave = () => {
    if (selectedJobSkill.length === 3) {
      setSelectedJobSkill(selectedJobSkill);
      toggleDrawer(false)();
    } else {
      alert("스킬 3개를 선택 해주세요.");
    }
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
                  checked={selectedJobSkill.includes(item.skillId)}
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

  const renderChips = () => {
    return (
      <Stack
        direction="row"
        spacing={0.8}
        sx={{ ...MainStyles.ChipContainer, padding: "10px 16px" }}
      >
        {Array.isArray(selectedJobSkill) &&
          selectedJobSkill.map((skillId) => {
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Button
        onClick={toggleDrawer(true)}
        fullWidth
        sx={skillsButton(selectedJobSkill.length === 3)}
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
                minWidth: "120px",
                flex: "0 0 auto",
              }}
            >
              {jobCategories.map((category) => (
                <Tab
                  key={category.id}
                  label={category.name}
                  value={category.id}
                />
              ))}
            </Tabs>
            {jobCategories.map((category) => (
              <TabPanel key={category.id} value={tabValue} index={category.id}>
                {renderCheckboxes()}
              </TabPanel>
            ))}
          </Box>
        </Box>

        <Box sx={{ padding: "20px" }}>
          <Button
            fullWidth
            mt={1}
            sx={{
              ...buttonStyle.Button,
              ...(selectedJobSkill.length === 3 && buttonStyle.ActiveButton),
            }}
            onClick={handleSave}
            disabled={selectedJobSkill.length !== 3}
          >
            완료
          </Button>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}