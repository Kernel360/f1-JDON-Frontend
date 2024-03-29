import { useState, useEffect } from 'react';
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
} from '@mui/material';
import { ChipStyle, MainStyles } from 'pages/PageStyles';
import TabPanel from './TabPanel';
import { buttonStyle } from '../button/NavigationBtnStyles';
import { skillsButton } from 'components/member/sign-up/InfoStyles';
import { getSkillsOnJD } from 'api/api';
import { useRecoilState } from 'recoil';
import { jobIdState, selectedJobSkillState } from 'recoil/atoms';
import { JOB_CATEGORIES } from 'constants/swipJobSkill';

export default function SwipJobSkill() {
  const jobCategories = JOB_CATEGORIES;
  const [jobId, setJobId] = useRecoilState(jobIdState);
  const [selectedJobSkill, setSelectedJobSkill] = useRecoilState(selectedJobSkillState);
  const [jobSkills, setJobSkills] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => setIsDrawerOpen(open);

  const handleChangeTab = (_, newValue) => {
    setSelectedJobSkill([]);
    setJobId(newValue);
  };

  //직무에 맞는 기술스택 세팅
  useEffect(() => {
    (async () => {
      try {
        if (jobId) {
          const res = await getSkillsOnJD(jobId);
          setJobSkills(res.skillList);
        }
      } catch (error) {
        console.error('getSkillsOnJD 오류', error);
      }
    })();
  }, [jobId]);

  const handleCheckboxChange = (skillId, event) => {
    const isChecked = event.target.checked;

    setSelectedJobSkill((prevCheckedItems) => {
      const checkedCount = prevCheckedItems.length;

      if (isChecked) {
        if (checkedCount < 3) {
          return [...prevCheckedItems, skillId];
        } else {
          alert('관심 기술은 최대 3개까지만 선택 가능합니다.');
          return prevCheckedItems;
        }
      } else {
        return prevCheckedItems.filter((el) => el !== skillId);
      }
    });
  };

  const handleSave = () => {
    if (selectedJobSkill.length !== 3) {
      alert('관심 기술은 3가지를 선택해야 합니다.');
    } else {
      toggleDrawer(false)();
    }
  };
  const renderCheckboxes = (jobSkills) => {
    return (
      <FormControl component="fieldset">
        <FormGroup>
          {jobSkills.map((item) => (
            <FormControlLabel
              key={item.skillId}
              control={
                <Checkbox
                  checked={selectedJobSkill.includes(item.skillId)}
                  onChange={(event) => handleCheckboxChange(item.skillId, event)}
                />
              }
              label={
                <Typography fontSize="0.875rem" color="#383838">
                  {item.keyword}
                </Typography>
              }
            />
          ))}
        </FormGroup>
      </FormControl>
    );
  };

  const renderChips = (selectedJobSkill) => {
    return (
      <Stack direction="row" spacing={0.8} sx={{ ...MainStyles.ChipContainer }}>
        {selectedJobSkill.map((skillId) => {
          const foundSkill = jobSkills.find((skill) => skill.skillId === skillId);
          const label = foundSkill ? foundSkill.keyword : '';
          return (
            label !== '' && (
              <Chip key={skillId} label={label} variant="outlined" sx={ChipStyle(true)} />
            )
          );
        })}
      </Stack>
    );
  };

  return (
    <div>
      <Button
        onClick={toggleDrawer(true)}
        fullWidth
        sx={skillsButton(selectedJobSkill.length === 3)}>
        클릭하여 선택하기
      </Button>
      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          '& .MuiDrawer-paper': {
            borderRadius: '16px 16px 0 0',
          },
        }}>
        <Box sx={{ width: '100%', padding: 3 }}>
          <Box sx={{ padding: '15px', borderBottom: '1px solid #F5F5F7' }}>
            {renderChips(selectedJobSkill)}
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              bgcolor: 'background.paper',
              display: 'flex',
              '@media (min-width: 300px)': {
                height: '450px',
              },
              '@media (min-width: 960px)': {
                height: '500px',
              },
            }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={jobId}
              onChange={handleChangeTab}
              aria-label="Vertical tabs example"
              sx={{
                borderRight: 1,
                borderColor: 'divider',
                minWidth: '120px',
                flex: '0 0 auto',
              }}>
              {jobCategories.map((category) => (
                <Tab key={category.id} label={category.name} value={category.id} />
              ))}
            </Tabs>
            {jobCategories.map((category) => (
              <TabPanel key={category.id} value={jobId} index={category.id}>
                {renderCheckboxes(jobSkills)}
              </TabPanel>
            ))}
          </Box>
        </Box>

        <Box sx={{ padding: '20px' }}>
          <Button
            fullWidth
            mt={1}
            sx={{
              ...buttonStyle.Button,
              ...(selectedJobSkill.length === 3 && buttonStyle.ActiveButton),
            }}
            onClick={handleSave}
            disabled={selectedJobSkill.length !== 3}>
            완료
          </Button>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}
